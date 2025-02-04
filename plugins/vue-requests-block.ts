export default function RequestsBlockPlugin() {
  return {
    name: 'vite-plugin-requests-block',

    transform(code, id) {
      // Проверяем, что файл является Vue-компонентом
      if (!id.endsWith('.vue')) return;

      // Регулярное выражение для поиска <requests>
      const requestsBlockRegex = /<requests([^>]*)>([\s\S]*?)<\/requests>/g;
      let match;
      let transformedCode = code;

      while ((match = requestsBlockRegex.exec(code)) !== null) {
        const content = match[2].trim(); // Содержимое блока
        const parsedContent = JSON.parse(content)
        try {
          if (
            typeof parsedContent !== 'object' ||
            !parsedContent.openapi ||
            !parsedContent.info ||
            !parsedContent.paths
          ) {
            throw new Error(
              'Invalid OpenAPI schema in <requests>. Ensure it contains "openapi", "info", and "paths".'
            );
          }

          // Генерируем JavaScript-код для добавления данных в setup()
          const reactiveDataCode = `
const $apiData = ref(${JSON.stringify(parsedContent)});
`;

          // Добавляем сгенерированный код перед закрывающим тегом </script> или в конец файла
          if (transformedCode.includes('<script setup lang="ts">')) {
            transformedCode = transformedCode.replace(
              '<script setup lang="ts">',
              `<script setup lang="ts">\n${reactiveDataCode}\n\n`
            );
          } else {
            transformedCode += `\n${reactiveDataCode}`;
          }
        } catch (error) {
          console.error('Error parsing <requests>: ', error.message);
        }
      }

      console.info(transformedCode)

      return { code: transformedCode };
    },
  };
}

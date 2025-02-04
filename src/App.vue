<script setup lang="ts">
import request from './my-get.request'
import { ref } from 'vue'

const res = ref()
fetch(request().toRequest())
  .then(r => r.json())
  .then(r => res.value = r)
</script>

<template>
  <header>
  </header>

  <main>
    <h1>{{ $apiData }}</h1>
    {{ res }}
  </main>
</template>

<requests lang="json">
{
  "openapi": "3.1.0",
  "info": {
    "title": "Example API",
    "version": "1.0"
  },
  "paths": {
    "/example": {
      "get": {
        "summary": "Example endpoint",
        "responses": {
          "200": {
            "description": "Success response"
          }
        }
      }
    }
  }
}
</requests>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>

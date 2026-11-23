<template>
  <div class="contenedor-principal">
    <Header titulo="RENDERIZADOR HTML" />

    <div class="panel-trabajo">
      <!-- Zona de entrada de HTML -->
      <div class="bloque-entrada">
        <label for="inputHtml">
          Pega el código HTML de Copilot aquí y pulsa <strong>Enter</strong>:
        </label>
        <textarea
          id="inputHtml"
          v-model="htmlCrudo"
          placeholder="Pega aquí el bloque <table>...</table> generado por Copilot"
          @keydown.enter.exact.prevent="renderizarSeleccionarYCopiar"
        ></textarea>

        <div class="barra-acciones">
          <button class="btn-primario" @click="renderizarSeleccionarYCopiar">
            Renderizar y Copiar (Enter)
          </button>
          <button class="btn-secundario" @click="limpiar">
            Limpiar
          </button>
          <span v-if="mensajeEstado" class="badge-exito">
            {{ mensajeEstado }}
          </span>
        </div>
      </div>

      <!-- Zona de vista previa / renderizado -->
      <div v-if="htmlRenderizado" class="bloque-preview">
        <div class="cabecera-preview">
          <span>Vista previa (seleccionada automáticamente):</span>
          <button class="btn-copiar-manual" @click="seleccionarYCopiar">
            Volver a seleccionar y copiar
          </button>
        </div>

        <div
          ref="zonaRender"
          tabindex="0"
          class="caja-render"
          @keydown.ctrl.a.prevent="seleccionarYCopiar"
          @keydown.meta.a.prevent="seleccionarYCopiar"
          v-html="htmlRenderizado"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";

export default {
  name: "RenderizadorHtmlCorreo",
  components: {
    Header,
  },
  data() {
    return {
      htmlCrudo: "",
      htmlRenderizado: "",
      mensajeEstado: "",
    };
  },
  methods: {
    renderizarSeleccionarYCopiar() {
      if (!this.htmlCrudo.trim()) return;

      // Renderiza el HTML tal cual viene de Copilot sin alterar sus estilos inline
      this.htmlRenderizado = this.htmlCrudo.trim();

      this.$nextTick(() => {
        this.seleccionarYCopiar();
      });
    },

    seleccionarYCopiar() {
      const elemento = this.$refs.zonaRender;
      if (!elemento) return;

      const rango = document.createRange();
      rango.selectNodeContents(elemento);

      const seleccion = window.getSelection();
      seleccion.removeAllRanges();
      seleccion.addRange(rango);

      try {
        document.execCommand("copy");
        this.mostrarMensaje("✓ Propuesta renderizada y copiada. Lista para pegar en Outlook (Ctrl+V).");
      } catch (err) {
        this.mostrarMensaje("Propuesta seleccionada. Pulsa Ctrl+C para copiar.");
      }
    },

    limpiar() {
      this.htmlCrudo = "";
      this.htmlRenderizado = "";
      this.mensajeEstado = "";
    },

    mostrarMensaje(texto) {
      this.mensajeEstado = texto;
      setTimeout(() => {
        this.mensajeEstado = "";
      }, 4500);
    },
  },
};
</script>

<style scoped>
.contenedor-principal {
  font-family: "Heebo", Arial, sans-serif;
  min-height: 100vh;
  background-color: #f7f8fa;
  color: #2b2d42;
}

.panel-trabajo {
  max-width: 1100px;
  margin: 28px auto;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.bloque-entrada,
.bloque-preview {
  background: #ffffff;
  padding: 24px;
  border-radius: 10px;
  border: 1px solid #eceef2;
  border-top: 3px solid #e86f68;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.08), 0 2px 10px 0 rgba(0, 0, 0, 0.06);
}

.bloque-preview {
  border-top-color: #00b894;
}

label {
  display: block;
  margin-bottom: 10px;
  color: #2b2d42;
  font-size: 14px;
  font-weight: 500;
}

textarea {
  width: 100%;
  height: 135px;
  padding: 12px 14px;
  border: 1px solid #dce1e7;
  border-radius: 8px;
  background-color: #fcfcfd;
  color: #2b2d42;
  font-family: "Consolas", "Courier New", monospace;
  font-size: 13px;
  resize: vertical;
  box-sizing: border-box;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s, background-color 0.2s;
}

textarea:focus {
  background-color: #ffffff;
  border-color: #e86f68;
  box-shadow: 0 0 0 3px rgba(232, 111, 104, 0.16);
}

.barra-acciones {
  margin-top: 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

button {
  font-family: "Heebo", Arial, sans-serif;
  padding: 9px 18px;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.2px;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s, box-shadow 0.2s;
}

button:active {
  transform: translateY(1px);
}

.btn-primario {
  background-color: #e86f68;
  color: #ffffff;
  box-shadow: 0 2px 6px rgba(232, 111, 104, 0.3);
}

.btn-primario:hover {
  background-color: #dc5d56;
}

.btn-secundario {
  background-color: #f1f3f6;
  color: #2b2d42;
  border: 1px solid #dce1e7;
}

.btn-secundario:hover {
  background-color: #e5e9ef;
}

.btn-copiar-manual {
  background-color: #00b894;
  color: #ffffff;
  padding: 7px 14px;
  font-size: 12px;
  box-shadow: 0 2px 5px rgba(0, 184, 148, 0.25);
}

.btn-copiar-manual:hover {
  background-color: #00a383;
}

.badge-exito {
  background-color: #e6f9f4;
  color: #007a62;
  border: 1px solid #b3ebd9;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
}

.cabecera-preview {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
  font-size: 14px;
  font-weight: 600;
  color: #2b2d42;
}

.caja-render {
  border: 1px dashed #cbd2dc;
  border-radius: 8px;
  padding: 20px;
  background-color: #ffffff;
  overflow-x: auto;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.caja-render:focus {
  border-color: #00b894;
  box-shadow: 0 0 0 3px rgba(0, 184, 148, 0.15);
}
</style>
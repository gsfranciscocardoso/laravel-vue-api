<template>
  <section ref="cvRef" style="background-color:#ffffff; padding:1.5rem; border-radius:0.75rem; max-width:768px; margin:2.5rem auto; font-family:sans-serif; box-shadow:0 0 10px rgba(0,0,0,0.1);">
    <div style="text-align:center">
      <h1 style="font-size:1.875rem; font-weight:bold; color:#111827">Francisco Cardoso</h1>
      <p style="color:#2563eb">Desenvolvedor na Gestisoft, LDA · Mafra, Lisboa</p>
      <a href="https://www.linkedin.com/in/francisco-cardoso-dev" target="_blank" style="font-size:0.875rem; color:#6b7280; text-decoration:underline">
        linkedin.com/in/francisco-cardoso-dev
      </a>
    </div>

    <hr style="margin:1.5rem 0;">

    <section>
      <h2 style="font-size:1.25rem; font-weight:600; color:#1f2937; margin-bottom:0.5rem;">Resumo</h2>
      <p style="color:#374151; font-size:0.875rem">
        Desenvolvedor web com foco em Laravel e Vue.js, com experiência sólida em backend, APIs, bancos de dados e aplicações empresariais. Trabalha desde 2020 na Gestisoft com múltiplas tecnologias e foco em soluções robustas e seguras.
      </p>
    </section>

    <section style="margin-top:1.5rem">
      <h2 style="font-size:1.25rem; font-weight:600; color:#1f2937; margin-bottom:0.5rem;">Experiência</h2>
      <p style="color:#111827; font-weight:500">Desenvolvedor – Gestisoft, LDA</p>
      <p style="font-size:0.875rem; color:#4b5563">Novembro de 2020 – Presente (4 anos e 8 meses)</p>
      <ul style="font-size:0.875rem; color:#374151; margin-top:0.5rem; padding-left:1rem; list-style:disc">
        <li>Desenvolvimento com JavaScript, Laravel, PHP</li>
        <li>Manutenção de sistemas internos (PHC, Artsoft, Kalipso)</li>
        <li>Implementação de APIs e módulos personalizados</li>
      </ul>
    </section>

    <section style="margin-top:1.5rem">
      <h2 style="font-size:1.25rem; font-weight:600; color:#1f2937; margin-bottom:0.5rem;">Educação</h2>
      <p style="color:#111827; font-weight:500">IPTRANS – Informática e Gestão</p>
      <p style="font-size:0.875rem; color:#4b5563">Setembro de 2017 – Julho de 2020</p>
    </section>

    <section style="margin-top:1.5rem">
      <h2 style="font-size:1.25rem; font-weight:600; color:#1f2937; margin-bottom:0.5rem;">Competências Técnicas</h2>
      <div style="display:flex; flex-wrap:wrap; gap:0.5rem; font-size:0.875rem">
        <span style="background-color:#dbeafe; color:#2563eb; padding:0.25rem 0.75rem; border-radius:9999px;">Laravel</span>
        <span style="background-color:#dbeafe; color:#2563eb; padding:0.25rem 0.75rem; border-radius:9999px;">Vue.js</span>
        <span style="background-color:#dbeafe; color:#2563eb; padding:0.25rem 0.75rem; border-radius:9999px;">PHP</span>
        <span style="background-color:#dbeafe; color:#2563eb; padding:0.25rem 0.75rem; border-radius:9999px;">MySQL</span>
        <span style="background-color:#dbeafe; color:#2563eb; padding:0.25rem 0.75rem; border-radius:9999px;">Tailwind CSS</span>
        <span style="background-color:#dbeafe; color:#2563eb; padding:0.25rem 0.75rem; border-radius:9999px;">Docker</span>
        <span style="background-color:#dbeafe; color:#2563eb; padding:0.25rem 0.75rem; border-radius:9999px;">OAuth 2.0</span>
        <span style="background-color:#dbeafe; color:#2563eb; padding:0.25rem 0.75rem; border-radius:9999px;">API Development</span>
        <span style="background-color:#dbeafe; color:#2563eb; padding:0.25rem 0.75rem; border-radius:9999px;">RGPD</span>
        <span style="background-color:#dbeafe; color:#2563eb; padding:0.25rem 0.75rem; border-radius:9999px;">SQL Server</span>
        <span style="background-color:#dbeafe; color:#2563eb; padding:0.25rem 0.75rem; border-radius:9999px;">XAMPP/WAMP</span>
        <span style="background-color:#dbeafe; color:#2563eb; padding:0.25rem 0.75rem; border-radius:9999px;">Git & GitHub</span>
      </div>
    </section>

    <div style="text-align:center; margin-top:2rem">
      <button @click="generatePDF"  @mouseover="hover = true"
  @mouseout="hover = false"
  :style="{
    backgroundColor: hover ? '#1d4ed8' : '#2563eb',
    color: '#fff',
    padding: '0.5rem 1.25rem',
    borderRadius: '0.5rem',
    fontWeight: 500,
    transition: 'background-color 0.3s'
  }">
        📄 Download PDF
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import html2pdf from 'html2pdf.js'

const cvRef = ref(null)
const hover = ref(false)

function generatePDF() {
  nextTick(() => {
    if (cvRef.value) {
      const element = cvRef.value
      const opt = {
        margin: 0.5,
        filename: 'FranciscoCardosoCV.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
      }
      try {
        html2pdf().set(opt).from(element).save()
      } catch (err) {
        console.error('Erro ao gerar PDF:', err)
      }
    }
  })
}
</script>

<style scoped>
/* Nenhuma classe Tailwind para evitar o uso de "oklch" */
</style>
const pageName = document.body.dataset.page;

document.querySelectorAll("[data-nav]").forEach((link) => {
  if (link.dataset.nav === pageName) {
    link.classList.add("is-active");
  }
});

const allocations = [
  { label: "Ayuda urgente", share: 30, color: "#2f6f5e" },
  { label: "Salud y medicinas", share: 25, color: "#c95e4b" },
  { label: "Vivienda y refugio", share: 18, color: "#2f7d9c" },
  { label: "Educacion", share: 15, color: "#e8a13a" },
  { label: "Comunidades y auditoria", share: 12, color: "#45525f" },
];

const currency = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function renderAllocation() {
  const allocationList = document.querySelector("#allocation-list");

  if (!allocationList) {
    return;
  }

  const fundTotal = 200000000;

  allocationList.innerHTML = allocations
    .map((item) => {
      const amount = fundTotal * (item.share / 100);
      return `
        <div class="allocation-row">
          <div class="allocation-meta">
            <span>${item.label} - ${item.share}%</span>
            <span>${currency.format(amount)}</span>
          </div>
          <div class="bar-track" aria-hidden="true">
            <div class="bar-fill" style="--value: ${item.share}%; --bar-color: ${item.color};"></div>
          </div>
        </div>
      `;
    })
    .join("");
}

function wireRequestForm() {
  const form = document.querySelector("#request-form");

  if (!form) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const request = {
      nombre: data.get("nombre"),
      tipo: data.get("tipo"),
      monto: data.get("monto"),
      banco: data.get("banco"),
      destinoPago: data.get("destino_pago"),
      fecha: new Date().toISOString(),
    };

    localStorage.setItem("ultimaSolicitudFondoMusk", JSON.stringify(request));
    window.location.href = "gracias.html";
  });
}

renderAllocation();
wireRequestForm();

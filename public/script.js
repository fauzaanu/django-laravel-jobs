fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    let tbody = document.querySelector("#data tbody");
    data.forEach((item) => {
      let tr = document.createElement("tr");
      tr.innerHTML = `
                <td class="border px-4 py-2">${item.date}</td>
                <td class="border px-4 py-2">${item.jobs.DJANGO_URL}</td>
                <td class="border px-4 py-2">${item.jobs.LARAVEL_URL}</td>
            `;
      tbody.appendChild(tr);
    });
  });

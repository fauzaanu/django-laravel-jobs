fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    let tbody = document.querySelector("#data tbody");
    data.forEach((item) => {
      let tr = document.createElement("tr");
      let djangoImg = item.imgs.DJANGO_URL
        ? `<img src="public/imgs/${item.imgs.DJANGO_URL}.png" width="100" />`
        : "";
      let laravelImg = item.imgs.LARAVEL_URL
        ? `<img src="public/imgs/${item.imgs.LARAVEL_URL}.png" width="100" />`
        : "";
      tr.innerHTML = `
                <td class="border px-4 py-2">${item.date}</td>
                <td class="border px-4 py-2">
                  <a href="public/imgs/${item.imgs.DJANGO_URL}.png" target="_blank">
                    ${item.jobs.DJANGO_URL}
                    ${djangoImg}
                  </a>
                </td>
                <td class="border px-4 py-2">
                  <a href="public/imgs/${item.imgs.LARAVEL_URL}.png" target="_blank">
                    ${item.jobs.LARAVEL_URL}
                    ${laravelImg}
                  </a>
                </td>
            `;
      tbody.appendChild(tr);
    });
  });

fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    let tbody = document.querySelector("#data tbody");
    data.forEach((item) => {
      let tr = document.createElement("tr");
      let djangoImg =
        item.imgs && item.imgs.DJANGO_URL
          ? `<img src="imgs/${item.imgs.DJANGO_URL}.png" class="w-full" />`
          : "";
      let laravelImg =
        item.imgs && item.imgs.LARAVEL_URL
          ? `<img src="imgs/${item.imgs.LARAVEL_URL}.png" class="w-full" />`
          : "";
      tr.innerHTML = `
                <td class="border px-4 py-2 text-xs">${item.date}</td>
                <td class="border px-4 py-2">
                  <a href="imgs/${
                    item.imgs && item.imgs.DJANGO_URL
                  }.png" target="_blank">
                    ${item.jobs.DJANGO_URL}
                    ${djangoImg}
                  </a>
                </td>
                <td class="border px-4 py-2">
                  <a href="imgs/${
                    item.imgs && item.imgs.LARAVEL_URL
                  }.png" target="_blank">
                    ${item.jobs.LARAVEL_URL}
                    ${laravelImg}
                  </a>
                </td>
            `;
      tbody.appendChild(tr);
    });
  });

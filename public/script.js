fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    let tbody = document.querySelector("#data tbody");
    let grid = document.querySelector("#grid");

    let pathArray = window.location.pathname
      .split("/")
      .filter((item) => item != "");

    let htmlFileName = pathArray.length > 0 ? pathArray.pop() : "index";
    let region =
      htmlFileName == "index" ? "Worldwide" : htmlFileName.replace(/-/g, " ");

    const filteredData =
      region == "Worldwide"
        ? data
        : data.filter((item) => item.region == region);

    filteredData.forEach((item) => {
      // Process data for table
      let tr = document.createElement("tr");
      let djangoImg =
        item.imgs && item.imgs.DJANGO_URL
          ? `<img src="imgs/${item.imgs.DJANGO_URL}.png" class="w-full border-2 border-green-800 rounded" />`
          : "";
      let laravelImg =
        item.imgs && item.imgs.LARAVEL_URL
          ? `<img src="imgs/${item.imgs.LARAVEL_URL}.png" class="w-full border-2 border-red-500 rounded" />`
          : "";

      // Only add rows and grid items if job count is not 0
      if (item.jobs.DJANGO_URL != 0 || item.jobs.LARAVEL_URL != 0) {
        tr.innerHTML = `
                  <td class=" px-4 py-2 text-xs">${item.date}</td>
                  <td class=" px-4 py-2">
                    <a href="imgs/${
                      item.imgs ? item.imgs.DJANGO_URL : ""
                    }.png" target="_blank">
                      ${item.jobs.DJANGO_URL}
                      ${djangoImg}
                    </a>
                  </td>
                  <td class=" px-4 py-2">
                    <a href="imgs/${
                      item.imgs ? item.imgs.LARAVEL_URL : ""
                    }.png" target="_blank">
                      ${item.jobs.LARAVEL_URL}
                      ${laravelImg}
                    </a>
                  </td>
              `;
        tbody.appendChild(tr);

        // Process data for grid
        let div = document.createElement("div");
        div.className =
          item.jobs.DJANGO_URL >= item.jobs.LARAVEL_URL
            ? "w-4 h-4 bg-green-800"
            : "w-4 h-4 bg-red-500";
        grid.appendChild(div);
      }
    });
  });

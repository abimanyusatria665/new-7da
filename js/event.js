import { articleData, categoryData, finishedArticleData } from "./data/data.js";

const ONGOING = "ONGOING";
const UPCOMING = "UPCOMING";
const COMPLETED = "COMPLETED";

const COMMUNICATION = "communication";
const LEADERSHIP = "leadership";
const TEAMBUILDING = "team building";

const articlePoint = document.getElementById("articlepoint");
const tagPoint = document.getElementById("tagpoint");
const completedArticlePoint = document.getElementById("completedarticlepoint");
const eventSearch = document.getElementById("event-search");
const centeringEl = document.querySelector(".centering");

function renderArticle(artData) {
  if (artData.length === 0) {
    articlePoint.innerHTML = `<h1 class="text-center font-weight-bold">No Events As Of Now</h1> <p class="text-center">Please check in Later</p>`;
    centeringEl.setAttribute(
      "class",
      "col-lg-8 d-flex justify-content-center align-items-center"
    );
  } else {
    articlePoint.innerHTML = "";
    centeringEl.setAttribute("class", "col-lg-8");
  }

  artData.forEach((data) => {
    const mainEl = document.createElement("div");

    mainEl.classList.add("col-md-12");

    mainEl.innerHTML = `<div class="blog-entry justify-content-start aos-init aos-animate" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100">
      <div class="row">
        <div class="col-lg-6 col-md-6 image">
          <a href="blog-single.html" class="linkInput block-20 img" id="imgInput">
          </a>
        </div>
        <div class="col-lg-6 col-md-6 desc">
          <div class="text">
            <p class="meta">
              <span id="statusBadge" class="badge bg-ongoing p-2"></span>
              <span><i class="fa fa-calendar me-1"></i><span id="dateInput"></span></span>
            </p>
            <h3 class="heading mb-3">
              <a id="titleInput" class="linkInput" href="#"></a>
            </h3>
            <p id="descInput">
              A small river named Duden flows by their place and
              supplies it with the necessary regelialia.
            </p>
            <a href="blog-single.html" class="btn btn-primary linkInput">Read more</a>
          </div>
        </div>
      </div>
    </div>
  `;

    const { link, title, img, desc, date, status } = data;

    const linkNeeded = mainEl.querySelectorAll(".linkInput");
    const titleInput = mainEl.querySelector("#titleInput");
    const imgInput = mainEl.querySelector("#imgInput");
    const descInput = mainEl.querySelector("#descInput");
    const dateInput = mainEl.querySelector("#dateInput");
    const statusBadge = mainEl.querySelector("#statusBadge");

    const newDesc =
      desc.split(" ").length > 19
        ? `${desc.split(" ").slice(0, 20).join(" ")}...`
        : desc;

    titleInput.innerText = title;
    imgInput.style.backgroundImage = `url('${img}')`;
    descInput.innerText = newDesc;
    dateInput.innerText = date;

    if (status === ONGOING) {
      statusBadge.classList.add("bg-ongoing");
      statusBadge.innerText = status;
    } else if (status === UPCOMING) {
      statusBadge.classList.add("bg-upcoming");
      statusBadge.innerText = status;
    } else if (status === COMPLETED) {
      statusBadge.classList.add("bg-complete");
      statusBadge.innerText = status;
    } else {
      statusBadge.classList.add("d-none");
    }

    linkNeeded.forEach((el) => {
      el.href = link;
    });

    articlePoint.append(mainEl);
  });
}

function renderCategory(cateData) {
  cateData.forEach((data) => {
    const button = document.createElement("a");
    button.href = "#articlepoint";
    button.classList.add("tag-cloud-link");
    button.classList.add("text-white");
    button.classList.add("atag");
    button.setAttribute("data-category", data);
    button.innerText = data;

    tagPoint.append(button);
  });
}

function renderSuccessfullArticle(artData) {
  if (artData.length === 0) {
    completedArticlePoint.innerHTML = "";
    return;
  }

  artData.forEach((data) => {
    const Carticle = document.createElement("div");
    Carticle.setAttribute("class", "block-21 mb-4 d-flex");

    Carticle.innerHTML = `<a
  class="blog-img me-4 imgInput"
  
></a>
<div class="text">
  <h3 class="heading">
    <a href="#" class="titleInput"
      ></a
    >
  </h3>
  <div class="meta">
    <span class="badge bg-complete past-badge">completed</span>
    <div>
      <a href="#"
        ><span class="fa fa-calendar"></span> <span class="dateInput"></span></a
      >
    </div>
  </div>
</div>`;

    const titleInput = Carticle.querySelector(".titleInput");
    const imgInput = Carticle.querySelector(".imgInput");
    const dateInput = Carticle.querySelector(".dateInput");

    const newTitle =
      data.title.split(" ").length > 8
        ? `${data.title.split(" ").slice(0, 8).join(" ")}...`
        : data.title;

    titleInput.innerText = newTitle;
    titleInput.style.fontSize = "13px";
    imgInput.style.backgroundImage = `url('${data.img}')`;
    dateInput.innerText = data.date;

    completedArticlePoint.append(Carticle);
  });
}

function fillterArticle(artData, opt = { search: null, tag: null }) {
  const { search, tag } = opt;

  let newArr = [];

  if (typeof search == "string") {
    newArr = artData.filter((data) => {
      let str = data.title.toLowerCase();

      return str.indexOf(search.toLowerCase()) > -1;
    });

    renderArticle(newArr);
  } else if (tag) {
    artData.forEach((data) => {
      let avail = false;

      data.tags.forEach((tagData) => {
        if (tag === tagData) {
          avail = true;
        }
      });

      if (avail) {
        newArr.push(data);
      }
    });

    renderArticle(newArr);
  } else {
    console.error("Filtering error");
  }
}

renderArticle(articleData);

renderCategory(categoryData);

renderSuccessfullArticle(finishedArticleData);

const tagList = document.querySelectorAll(".atag");

eventSearch.addEventListener("keyup", (e) =>
  fillterArticle(articleData, { search: e.target.value })
);
tagList.forEach((data) => {
  data.addEventListener("click", (e) => {
    const activea = document.querySelector(".active");

    if (activea === e.target) {
      activea.classList.remove("active");
      renderArticle(articleData);
    } else {
      if (activea) activea.classList.remove("active");
      e.target.classList.add("active");
      fillterArticle(articleData, { tag: e.target.dataset.category });
    }
  });
});

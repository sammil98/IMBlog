// js/display-articles.js
document.addEventListener('DOMContentLoaded', function() {
    const articlesList = document.getElementById('articles-list');
    let articles = localStorage.getItem('articles');
  
    if (articles) {
      articles = JSON.parse(articles);
      articles.forEach((article, index) => {
        const articleDiv = document.createElement('div');
        articleDiv.className = 'blog-post';
        articleDiv.innerHTML = `
          <div class="blog-post-thumb">
            <img src="${article.thumbnailUrl}" alt="blog-thum" />
          </div>
          <div class="blog-post-content">
            <div class="blog-post-tag">
              <a href="#">${article.category}</a>
            </div>
            <div class="blog-post-title">
              <a href="single-blog.html?article=${index}">${article.title}</a>
            </div>
            <div class="blog-post-meta">
              <ul>
                <li>By <a href="about.html">IMABA Team</a></li>
                <li>
                  <i class="fa fa-clock-o"></i>
                  ${article.date} - 2 min
                </li>
              </ul>
            </div>
            <p>${article.content.substring(0, 100)}...</p>
            <a href="single-blog.html?article=${index}" class="blog-post-action">read more <i class="fa fa-angle-right"></i></a>
          </div>
        `;
        articlesList.appendChild(articleDiv);
      });
    } else {
      articlesList.innerHTML = '<p>No articles found.</p>';
    }
  });
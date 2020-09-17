module.exports = {
  theme: '@vuepress/blog',
  themeConfig: {
    globalPagination: {
  
      prevText: '上一页', // Text for previous links.
      nextText: '下一页', // Text for next links.
      lengthPerPage: '8', // Maximum number of posts per page.
      // layout: 'Pagination', // Layout for pagination page
  
    },
    nav: [
      {
        text: 'Blog',
        link: '/',
      },
      {
        text: 'Tags',
        link: '/tag/',
      },
    ],
    directories: [
      {
        id: 'post', // Unique id for current classifier
        dirname: '_posts', // Matched directory name
        path: '/', // Entry page for current classifier
        title: '随笔', // Entry and pagination page titles for current classifier.
        // layout: 'IndexWriting', // Layout component name for entry page.
        frontmatter:{ //Front matter for entry page.
          tag: 'vuepress'
        },
        // itemLayout: 'Writing', // Layout for matched pages.
        // itemPermalink: '/writings/:year/:month/:day/:slug', // Permalink for matched pages.
        pagination: { // Pagination behavior
          lengthPerPage: 2,
        },
      }
    ]
  }
}
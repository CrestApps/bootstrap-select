document.addEventListener('DOMContentLoaded', function () {
  function formPostData (url, fields) {
    var form = document.createElement('form');
    form.style.display = 'none';
    form.method = 'post';
    form.action = url;

    Object.keys(fields).forEach(function (name) {
      var input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.value = fields[name];
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
    form.remove();
  }

  function getText (url) {
    return fetch(url).then(function (response) {
      if (!response.ok) throw new Error('Unable to load ' + url);
      return response.text();
    });
  }

  function openPlayground () {
    var opener = document.getElementById('plnkrOpener');
    var bootstrapVersion = opener.getAttribute('data-bootstrap-version') || '5';
    var name = 'bootstrap-select playground (Bootstrap ' + bootstrapVersion + ')';
    var assetBase = new URL('.', opener.src);
    var postData = {
      'tags[0]': 'vanilla-js',
      'tags[1]': 'bootstrap-select',
      'private': true,
      description: name
    };

    var files = [
      {
        name: 'index.html',
        content: '<!doctype html>\n' +
          '<html lang="en">\n' +
          '<head>\n' +
          '  <meta charset="utf-8">\n' +
          '  <meta name="viewport" content="width=device-width, initial-scale=1">\n' +
          '  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">\n' +
          '  <link rel="stylesheet" href="css/bootstrap-select.css">\n' +
          '</head>\n' +
          '<body class="p-4">\n' +
          '  <select class="selectpicker" placeholder="Choose a condiment" data-live-search="true">\n' +
          '    <option>Mustard</option>\n' +
          '    <option>Ketchup</option>\n' +
          '    <option>Relish</option>\n' +
          '  </select>\n' +
          '  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"><\\/script>\n' +
          '  <script src="js/bootstrap-select.js"><\\/script>\n' +
          '</body>\n' +
          '</html>\n'
      },
      {
        name: 'js/bootstrap-select.js',
        url: new URL('../dist/js/bootstrap-select.js', assetBase).href
      },
      {
        name: 'css/bootstrap-select.css',
        url: new URL('../dist/css/bootstrap-select.css', assetBase).href
      }
    ];

    Promise.all(files.map(function (file) {
      if (file.content) {
        postData['files[' + file.name + ']'] = file.content;
        return Promise.resolve();
      }

      return getText(file.url).then(function (content) {
        postData['files[' + file.name + ']'] = content;
      });
    })).then(function () {
      formPostData('https://plnkr.co/edit/?p=preview', postData);
    });
  }

  openPlayground();
});

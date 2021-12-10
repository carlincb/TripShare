const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#blog-name').value.trim();
  const content = document.querySelector('#blog-desc').value.trim();

  if (title && content) {
    const response = await fetch(`/api/blog`, {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create blog post');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/blog/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete blog post');
    }
  }
};
$(document).ready(() => { $('#drag-and-drop-zone').dmUploader({ //
  url: '/demo/java-script/upload',
  maxFileSize: 3000000, // 3 Megs 
  allowedTypes: 'image/*',
  extFilter: ["jpg", "jpeg","png","gif"],
  onDragEnter: function(){
    // Happens when dragging something over the DnD area
    this.addClass('active');
  },
  onDragLeave: function(){
    // Happens when dragging something OUT of the DnD area
    this.removeClass('active');
  },
  onInit: function(){
    // Plugin is ready to use
    ui_add_log('Penguin initialized :)', 'info');
  },
  onComplete: function(){
    // All files in the queue are processed (success or error)
    ui_add_log('All pending tranfers finished');
  },
  onNewFile: function(id, file){
    // When a new file is added using the file selector or the DnD area
    ui_add_log('New file added #' + id);
    ui_multi_add_file(id, file);

    if (typeof FileReader !== "undefined"){
      var reader = new FileReader();
      var img = $('#uploaderFile' + id).find('img');
      
      reader.onload = function (e) {
        img.attr('src', e.target.result);
      }
      reader.readAsDataURL(file);
    }
  },
  onBeforeUpload: function(id){
    // about tho start uploading a file
    ui_add_log('Starting the upload of #' + id);
    ui_multi_update_file_progress(id, 0, '', true);
    ui_multi_update_file_status(id, 'uploading', 'Uploading...');
  },
  onUploadProgress: function(id, percent){
    // Updating file progress
    ui_multi_update_file_progress(id, percent);
  },
  onUploadSuccess: function(id, data){
    // A file was successfully uploaded
    ui_add_log('Server Response for file #' + id + ': ' + JSON.stringify(data));
    ui_add_log('Upload of file #' + id + ' COMPLETED', 'success');
    ui_multi_update_file_status(id, 'success', 'Upload Complete');
    ui_multi_update_file_progress(id, 100, 'success', false);
  },
  onUploadError: function(id, xhr, status, message){
    ui_multi_update_file_status(id, 'danger', message);
    ui_multi_update_file_progress(id, 0, 'danger', false);  
  },
  onFallbackMode: function(){
    // When the browser doesn't support this plugin :(
    ui_add_log('Plugin cant be used here, running Fallback callback', 'danger');
  },
  onFileSizeError: function(file){
    ui_add_log('File \'' + file.name + '\' cannot be added: size excess limit', 'danger');
  },
  onFileTypeError: function(file){
    ui_add_log('File \'' + file.name + '\' cannot be added: must be an image (type error)', 'danger');
  },
  onFileExtError: function(file){
    ui_add_log('File \'' + file.name + '\' cannot be added: must be an image (extension error)', 'danger');
  }
});
});
function ui_add_log(message, color)
{
  var d = new Date();

  var dateString = (('0' + d.getHours())).slice(-2) + ':' +
    (('0' + d.getMinutes())).slice(-2) + ':' +
    (('0' + d.getSeconds())).slice(-2);

  color = (typeof color === 'undefined' ? 'muted' : color);

  var template = $('#debug-template').text();
  template = template.replace('%%date%%', dateString);
  template = template.replace('%%message%%', message);
  template = template.replace('%%color%%', color);
  
  $('#debug').find('li.empty').fadeOut(); // remove the 'no messages yet'
  $('#debug').prepend(template);
}
function ui_multi_add_file(id, file)
{
  var template = $('#files-template').text();
  template = template.replace('%%filename%%', file.name);

  template = $(template);
  template.prop('id', 'uploaderFile' + id);
  template.data('file-id', id);

  $('#files').find('li.empty').fadeOut(); // remove the 'no files yet'
  $('#files').prepend(template);
}

// Changes the status messages on our list
function ui_multi_update_file_status(id, status, message)
{
  $('#uploaderFile' + id).find('span').html(message).prop('class', 'status text-' + status);
}

// Updates a file progress, depending on the parameters it may animate it or change the color.
function ui_multi_update_file_progress(id, percent, color, active)
{
  color = (typeof color === 'undefined' ? false : color);
  active = (typeof active === 'undefined' ? true : active);

  var bar = $('#uploaderFile' + id).find('div.progress-bar');

  bar.width(percent + '%').attr('aria-valuenow', percent);
  bar.toggleClass('progress-bar-striped progress-bar-animated', active);

  if (percent === 0){
    bar.html('');
  } else {
    bar.html(percent + '%');
  }

  if (color !== false){
    bar.removeClass('bg-success bg-info bg-warning bg-danger');
    bar.addClass('bg-' + color);
  }
}

// Toggles the disabled status of Star/Cancel buttons on one particual file
function ui_multi_update_file_controls(id, start, cancel, wasError)
{
  wasError = (typeof wasError === 'undefined' ? false : wasError);

  $('#uploaderFile' + id).find('button.start').prop('disabled', !start);
  $('#uploaderFile' + id).find('button.cancel').prop('disabled', !cancel);

  if (!start && !cancel) {
    $('#uploaderFile' + id).find('.controls').fadeOut();
  } else {
    $('#uploaderFile' + id).find('.controls').fadeIn();
  }

  if (wasError) {
    $('#uploaderFile' + id).find('button.start').html('Retry');
  }
}

document
  .querySelector('.new-blog-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.blog-list')
  .addEventListener('click', delButtonHandler);


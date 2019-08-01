 // Form services

 var toolbarOptions = [
 	['bold', 'italic', 'underline', 'strike'], // toggled buttons
 	['blockquote', 'code-block'],
 	[{
 		'header': 1
 	}, {
 		'header': 2
 	}], // custom button values
 	[{
 		'list': 'ordered'
 	}, {
 		'list': 'bullet'
 	}],
 	[{
 		'script': 'sub'
 	}, {
 		'script': 'super'
 	}], // superscript/subscript
 	[{
 		'indent': '-1'
 	}, {
 		'indent': '+1'
 	}], // outdent/indent
 	[{
 		'direction': 'rtl'
 	}], // text direction
 	[{
 		'header': [1, 2, 3, 4, 5, 6, false]
 	}],
 	[{
 		'color': []
 	}], // dropdown with defaults from theme
 	[{
 		'align': []
 	}],
 	['link', 'image'],
 	['clean'] // remove formatting button
 ];
 var quill = new Quill('#editor', {
 	modules: {
 		toolbar: toolbarOptions
 	},
 	theme: 'snow'
 });
 quill.on('text-change', function() {
 	var delta = quill.getContents();
 	var text = quill.getText();
 	console.log($('.ql-editor').html());
 	$('#desc').val($('.ql-editor').html());

 });
 $(document).ready(function() {

 	$.uploadPreview({
 		input_field: "#image-upload", // Default: .image-upload
 		preview_box: "#image-preview", // Default: .image-preview
 		label_field: "#image-label", // Default: .image-label
 		label_default: "Choose File", // Default: Choose File
 		label_selected: "Change File", // Default: Change File
 		no_label: false // Default: false
 	});
 	$('#services').selectize({
 		plugins: ['restore_on_backspace', 'remove_button'],
 		delimiter: ',',
 		persist: false,
 		create: function(input) {
 			return {
 				value: input,
 				text: input
 			}
 		}
 	});
 });
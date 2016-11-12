var userDocments = document.getElementById('file')

userDocments.addEventListener('change', function(evt) {

  console.log(this.files)
  
 for(let file in this.files) {
    var reader = new FileReader()
    console.log(this.files[file])
    reader.onload = function(event) {
      console.log(event.target.result)
    }
    reader.readAsText(this.files[file])
 }
});
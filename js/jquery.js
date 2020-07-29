
function readURL(input, id) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $(`#${id}`).attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}
function play(file) {
    var audio = new Audio(file);
    audio.play();
}
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}



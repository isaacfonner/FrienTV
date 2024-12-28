async function searchMedia(query) {
    const response = await fetch(`/api/search/${encodeURIComponent(query)}`);
        
    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
        
    const data = await response.json();
    console.log(data)
    return data;
}

function showMedia(data) {
    const picker = document.body.querySelector('.mediaPicker');
    const items = data.results.sort((a, b) => {
        const dateA = new Date(a.release_date || '1900-01-01').getTime();
        const dateB = new Date(b.release_date || '1900-01-01').getTime();
        return dateB - dateA;
    });
    picker.innerHTML = "";
    items.forEach(media => {
        const mediaElem = document.createElement('div');
        mediaElem.setAttribute('id', media.id);
        mediaElem.classList.add('mediaInPicker');

        const mediaLogo = document.createElement('img');
        mediaLogo.setAttribute('draggable', false);
        mediaLogo.classList.add('mediaIcon');
        mediaLogo.src = (media.backdrop_path || media.poster_path) ? "/api/image" + (media.backdrop_path !== null ? media.backdrop_path : media.poster_path) : "/api/placeholder/440x226";

        const mediaInfo = document.createElement('div');
        mediaInfo.classList.add('mediaInfo');

        const mediaTitle = document.createElement('a');
        mediaTitle.innerText = media.original_title;

        const mediaRelease = document.createElement('a');
        mediaRelease.innerText = new Date(media.release_date).getFullYear() || "Unknown";

        mediaElem.appendChild(mediaLogo);
        mediaElem.appendChild(mediaInfo);
        mediaInfo.appendChild(mediaTitle);
        mediaInfo.appendChild(mediaRelease);
        picker.appendChild(mediaElem);
    });
}

async function handleSearch() {
    const query = document.body.querySelector('.searchBar').value;
    const data = await searchMedia(query);
    showMedia(data);
}
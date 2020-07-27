class Modules {
    
    //Convert timestamp to readable format date
    convert(y) {
        const x = new Date(y);
        const date = x.toLocaleDateString('en-US');
        const time = x.toLocaleTimeString('en-US');
        const newDate = { date, time }
        return newDate;
    }

    //Gif loader
    loader(id) {
        const el = document.querySelectorAll(`#loader_${id}`);
        el.forEach((loader) => {
            loader.style.display = 'block';
            setTimeout(() => {
                loader.style.display = 'none';
                window.location.reload();
            }, 1000);
        });
    }

    //Display notification
    displayNotification() {
        const notify = document.getElementById('displayNot');
        notify.style.display = 'block';
        setTimeout(() => {
            notify.style.display = 'none';
            window.location.reload();
        }, 2000);
        this.closeNotification();
    }

    //Close notification
    closeNotification() {
        const close = document.getElementById('closeNotification');
        close.addEventListener('click', () => {
            document.getElementById('displayNot').style.display = 'none';
        });
    }

    //Display case input is null
    displayDanger() {
        const danger = document.getElementById('displayDanger');
        danger.style.display = 'block';
        danger.focus();
        setTimeout(() => {
            danger.style.display = 'none';
        }, 3000);
    }
}

export default Modules;
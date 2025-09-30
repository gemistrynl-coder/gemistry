const isMobile = window.innerWidth <= 768

// Handig: query param om te forceren tijdens testen
const urlParams = new URLSearchParams(window.location.search)
const forceMobile = urlParams.get('mobile') === 'true'
const forceDesktop = urlParams.get('desktop') === 'true'

if (forceMobile || (!forceDesktop && isMobile)) {
    import('./mobile/main.js').then(({ default: start }) => start())
} else {
    import('./desktop/main.js').then(({ default: start }) => start())
}

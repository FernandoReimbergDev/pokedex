const fetchPokemon = () => {
    const getPokemonUrl= id => `https://pokeapi.co/api/v2/pokemon/${id}`;
    const pokemonPromises = []

    for(let i = 1; i <= 251 ; i++){
        pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json()))        
    }

    Promise.all(pokemonPromises)
    .then(pokemons => {
        const lisPokemon = pokemons.reduce((accumulator, pokemon) =>{
            const types = pokemon.types.map(typeInfo => typeInfo.type.name)
            accumulator += `
            <li class="card ${types[0]}">
            <img class="card-image" alt="${pokemon.name}" src="./assets/img/pokemons/poke_${pokemon.id}.gif" />
            <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
            <p class="card-subtitle">${types.join(' | ')}</p>
            </li>`
            return accumulator
        }, '')
        
        const ul = document.querySelector('[data-js="pokedex"]')
        
        ul.innerHTML = lisPokemon
    })
}

fetchPokemon()


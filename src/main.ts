const input = document.getElementById("search-input") as HTMLInputElement;
const button = document.getElementById("search-button") as HTMLButtonElement;
const nameSpan = document.getElementById("pokemon-name") as HTMLSpanElement;
const idSpan = document.getElementById("pokemon-id") as HTMLSpanElement;
const weightSpan = document.getElementById("weight") as HTMLSpanElement;
const heightSpan = document.getElementById("height") as HTMLSpanElement;
const imgDiv = document.getElementById("img") as HTMLDivElement;
const typesDiv = document.getElementById("types") as HTMLDivElement;
const hpTd = document.getElementById("hp") as HTMLTableElement;
const attackTd = document.getElementById("attack") as HTMLTableElement;
const defenseTd = document.getElementById("defense") as HTMLTableElement;
const specAttackTd = document.getElementById(
  "special-attack"
) as HTMLTableElement;
const specDefenseTd = document.getElementById(
  "special-defense"
) as HTMLTableElement;
const speedTd = document.getElementById("speed") as HTMLTableElement;

interface Info {
  name: string;
  id: number;
  weight: number;
  height: number;
}

interface Type {
  name: string;
}

interface TypeInType {
  type: Type;
}

const searchPokemon = () => {
  const keyword = input.value.toLowerCase();
  if (keyword === "") {
    return;
  } else {
    fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${keyword}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const { name, id, weight, height }: Info = data;
        const imgURL: string = data.sprites.front_default;
        const pokemonTypes = data.types.map(
          (type: TypeInType) => type.type.name
        );
        const hp: number = data.stats[0].base_stat;
        const attack: number = data.stats[1].base_stat;
        const defense: number = data.stats[2].base_stat;
        const specAttack: number = data.stats[3].base_stat;
        const specDefense: number = data.stats[4].base_stat;
        const speed: number = data.stats[5].base_stat;
        nameSpan.textContent = name.toUpperCase();
        idSpan.textContent = `#${id}`;
        weightSpan.textContent = `Weight: ${weight}`;
        heightSpan.textContent = `Height: ${height}`;
        imgDiv.innerHTML = `<img id="sprite" src=${imgURL} />`;
        typesDiv.innerHTML = pokemonTypes
          .map(
            (type: string) =>
              `<span class="type ${type}">${type.toUpperCase()}</span>`
          )
          .join(" ");
        hpTd.textContent = String(hp);
        attackTd.textContent = String(attack);
        defenseTd.textContent = String(defense);
        specAttackTd.textContent = String(specAttack);
        specDefenseTd.textContent = String(specDefense);
        speedTd.textContent = String(speed);
      })
      .catch((e) => {
        console.error(e);
        alert("Pokémon not found");
      });
  }
};

button.addEventListener("click", searchPokemon);

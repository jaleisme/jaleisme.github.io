import React from "react";
import HubungiKamiForm from "./HubungiKamiForm";
import Pokemon from "./Pokemon";

class Main extends React.Component {
  render() {
    const listPokemon = [
      {
        id: 0,
        name: "Pikachu",
        image: "./img/pikachu.png",
        introduction:
          "Pikachu is a short, chubby rodent Pokémon. It is covered in yellow fur with two horizontal brown stripes on its back. It has a small mouth, long, pointed ears with black tips, and brown eyes. Each cheek is a red circle that contains a pouch for electricity storage. It has short forearms with five fingers on each paw, and its feet each have three toes. At the base of its lightning bolt-shaped tail is a patch of brown fur. A female will have a V-shaped notch at the end of its tail, which looks like the top of a heart. It is classified as a quadruped, but it has been known to stand and walk on its hind legs.",
      },
      {
        id: 1,
        name: "Bulbasaur",
        image: "./img/bulbasaur.png",
        introduction:
          "Bulbasaur is a small, quadrupedal amphibian Pokémon that has blue-green skin with darker patches. It has red eyes with white pupils, pointed, ear-like structures on top of its head, and a short, blunt snout with a wide mouth. A pair of small, pointed teeth are visible in the upper jaw when its mouth is open. Each of its thick legs ends with three sharp claws. On Bulbasaur's back is a green plant bulb, which is grown from a seed planted there at birth. The bulb also conceals two slender, tentacle-like vines and provides it with energy through photosynthesis as well as from the nutrient-rich seeds contained within.",
      },
      {
        id: 2,
        name: "Blastoise",
        image: "./img/blastoise.png",
        introduction:
          "Blastoise is a large, bipedal turtle Pokémon. Its body is blue and is mostly hidden by its tough, brown shell. This shell has a cream-colored underside and a white ridge encircling its arms and separating the upper and lower halves. Two powerful water cannons reside at the top of its shell over its shoulders. These cannons can be extended or withdrawn. Blastoise's head has triangular ears that are black on the inside, small brown eyes, and a cream-colored lower jaw. Its arms are thick, and it has three claws on each hand. Its feet have three claws on the front and one on the back. Poking out of the bottom of its shell is a stubby tail.",
      },
      {
        id: 3,
        name: "Charmander",
        image: "./img/charmander.png",
        introduction:
          "Charmander is a bipedal, reptilian Pokémon with a primarily orange body and blue eyes. Its underside from the chest down and the soles of its feet are cream-colored. It has two small fangs visible in its upper jaw and two smaller fangs in its lower jaw. A fire burns at the tip of this Pokémon's slender tail and has blazed there since Charmander's birth. The flame can be used as an indication of Charmander's health and mood, burning brightly when the Pokémon is strong, weakly when it is exhausted, wavering when it is happy, and blazing when it is enraged. It is said that Charmander dies if its flame goes out. However, if the Pokémon is healthy, the flame will continue to burn even if it gets a bit wet and is said to steam in the rain.",
      },
    ];
    return (
      <div className="main-wrapper">
        <div className="main">
          <div className="hello-container">
            <h1>Hello, Pokemon hunter</h1>
            <h2>Selamat datang di dunia Pokemon</h2>
          </div>
          <div className="pokemon-container">
            <h3>List Pokemon</h3>
            <div className="list-card">
              {listPokemon.map((pokemon) => {
                return (
                  <Pokemon
                    id={pokemon.id}
                    name={pokemon.name}
                    image={pokemon.image}
                    introduction={pokemon.introduction}
                  />
                );
              })}
            </div>
          </div>
          {/*Masukkan komponen HubungiKamiForm.js di bawah ini*/}
          <div className="hubungikami-container">
            <h3>Hubungi Kami</h3>
            <HubungiKamiForm />
          </div>
        </div>
      </div>
    );
  }
}

export default Main;

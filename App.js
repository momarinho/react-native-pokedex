import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

const Pokemon = () => {
  const [pokemonName, setPokemonName] = useState('Loading...');
  const [pokemonNumber, setPokemonNumber] = useState('');
  const [pokemonImage, setPokemonImage] = useState('');

  const [inputValue, setInputValue] = useState('');
  const [searchPokemon, setSearchPokemon] = useState(1);

  const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    );

    if (APIResponse.status === 200) {
      const data = await APIResponse.json();
      return data;
    }
  };

  const renderPokemon = async (pokemon) => {
    setPokemonName('Loading...');
    setPokemonNumber('');

    const data = await fetchPokemon(pokemon);

    if (data) {
      setPokemonImage(
        data['sprites']['versions']['generation-iv']['heartgold-soulsilver'][
          'front_default'
        ]
      );
      setPokemonName(data.name);
      setPokemonNumber(data.id);
      setInputValue('');
      setSearchPokemon(data.id);
    } else {
      setPokemonName('Not found :/');
      setPokemonNumber('');
    }
  };

  useEffect(() => {
    renderPokemon(searchPokemon);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    renderPokemon(inputValue.toLowerCase());
  };

  const handleNext = () => {
    setSearchPokemon(searchPokemon + 1);
    renderPokemon(searchPokemon + 1);
  };

  const handlePrevious = () => {
    setSearchPokemon(searchPokemon - 1);
    renderPokemon(searchPokemon - 1);
  };

  return (
    <>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <Image
          source={{ uri: pokemonImage ? pokemonImage : null }}
          style={styles.pokemonImage}
        />

        <View style={styles.pokemonDataContainer}>
          <Text style={styles.pokemonNumber}>{pokemonNumber}</Text>
          <Text style={styles.pokemonName}>{pokemonName}</Text>
        </View>

        <TextInput
          style={styles.inputSearch}
          placeholder="Name or Number"
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
          required
          
        />

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.buttonPrev} onPress={handlePrevious}>
            <Text>Previous</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonSearch} onPress={handleSubmit}>
            <Text>Search</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonNext} onPress={handleNext}>
            <Text>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Pokemon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pokemonImage: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  pokemonDataContainer: {
    alignItems: 'center',
  },
  pokemonNumber: {
    fontWeight: 'bold',
  },
  pokemonName: {
    fontSize: 20,
    marginTop: 10,
    textTransform: 'uppercase',
  },
  inputSearch: {
    width: '80%',
    padding: 10,
    marginTop: 20,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  buttonPrev: {
    padding: 10,
    marginRight: 20,
    backgroundColor: 'lightgrey',
    borderRadius: 10,
  },
  buttonSearch: {
    padding: 10,
    marginRight: 20,
    backgroundColor: 'lightgrey',
    borderRadius: 10,
  },
  buttonNext: {
    padding: 10,
    backgroundColor: 'lightgrey',
    borderRadius: 10,
  },
});

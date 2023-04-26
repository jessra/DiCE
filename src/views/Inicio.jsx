import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import SwitchDarkMode from '../components/SwitchDarkMode';

export default function Inicio() {
	const data = [{"word":"how","phonetic":"/hæŏ/","phonetics":[{"text":"/hæŏ/","audio":""},{"text":"/hæŏ/","audio":""},{"text":"/haʊ/","audio":"https://api.dictionaryapi.dev/media/pronunciations/en/how-uk.mp3","sourceUrl":"https://commons.wikimedia.org/w/index.php?curid=9022019","license":{"name":"BY 3.0 US","url":"https://creativecommons.org/licenses/by/3.0/us"}},{"text":"/haʊ/","audio":"https://api.dictionaryapi.dev/media/pronunciations/en/how-us.mp3","sourceUrl":"https://commons.wikimedia.org/w/index.php?curid=1217911","license":{"name":"BY-SA 3.0","url":"https://creativecommons.org/licenses/by-sa/3.0"}}],"meanings":[{"partOfSpeech":"noun","definitions":[{"definition":"The means by which something is accomplished.","synonyms":[],"antonyms":[],"example":"I am not interested in the why, but in the how."}],"synonyms":[],"antonyms":[]},{"partOfSpeech":"adverb","definitions":[{"definition":"To what degree.","synonyms":[],"antonyms":[],"example":"How often do you practice?"},{"definition":"In what manner.","synonyms":[],"antonyms":[],"example":"How do you solve this puzzle?"},{"definition":"In what state.","synonyms":[],"antonyms":[],"example":"How are you?"},{"definition":"Used as a modifier to indicate surprise, delight, or other strong feelings in an exclamation.","synonyms":[],"antonyms":[],"example":"How very interesting!"}],"synonyms":[],"antonyms":[]},{"partOfSpeech":"conjunction","definitions":[{"definition":"The manner or way that.","synonyms":[],"antonyms":[],"example":"I remember how I solved this puzzle."},{"definition":"That, the fact that, the way that.","synonyms":[],"antonyms":[]}],"synonyms":[],"antonyms":[]}],"license":{"name":"CC BY-SA 3.0","url":"https://creativecommons.org/licenses/by-sa/3.0"},"sourceUrls":["https://en.wiktionary.org/wiki/how"]},{"word":"how","phonetic":"/hæŏ/","phonetics":[{"text":"/hæŏ/","audio":""},{"text":"/hæŏ/","audio":""},{"text":"/haʊ/","audio":"https://api.dictionaryapi.dev/media/pronunciations/en/how-uk.mp3","sourceUrl":"https://commons.wikimedia.org/w/index.php?curid=9022019","license":{"name":"BY 3.0 US","url":"https://creativecommons.org/licenses/by/3.0/us"}},{"text":"/haʊ/","audio":"https://api.dictionaryapi.dev/media/pronunciations/en/how-us.mp3","sourceUrl":"https://commons.wikimedia.org/w/index.php?curid=1217911","license":{"name":"BY-SA 3.0","url":"https://creativecommons.org/licenses/by-sa/3.0"}}],"meanings":[{"partOfSpeech":"noun","definitions":[{"definition":"An artificial barrow or tumulus.","synonyms":[],"antonyms":[]},{"definition":"A small hill in northern England. (Usage preserved mainly in place names.)","synonyms":[],"antonyms":[]}],"synonyms":[],"antonyms":[]}],"license":{"name":"CC BY-SA 3.0","url":"https://creativecommons.org/licenses/by-sa/3.0"},"sourceUrls":["https://en.wiktionary.org/wiki/how"]},{"word":"how","phonetic":"/hæŏ/","phonetics":[{"text":"/hæŏ/","audio":""},{"text":"/hæŏ/","audio":""},{"text":"/haʊ/","audio":"https://api.dictionaryapi.dev/media/pronunciations/en/how-uk.mp3","sourceUrl":"https://commons.wikimedia.org/w/index.php?curid=9022019","license":{"name":"BY 3.0 US","url":"https://creativecommons.org/licenses/by/3.0/us"}},{"text":"/haʊ/","audio":"https://api.dictionaryapi.dev/media/pronunciations/en/how-us.mp3","sourceUrl":"https://commons.wikimedia.org/w/index.php?curid=1217911","license":{"name":"BY-SA 3.0","url":"https://creativecommons.org/licenses/by-sa/3.0"}}],"meanings":[{"partOfSpeech":"interjection","definitions":[{"definition":"A greeting, used in representations of Native American speech.","synonyms":[],"antonyms":[]}],"synonyms":[],"antonyms":[]}],"license":{"name":"CC BY-SA 3.0","url":"https://creativecommons.org/licenses/by-sa/3.0"},"sourceUrls":["https://en.wiktionary.org/wiki/how"]}]
	const [busqueda, setbusqueda] = useState('');
	let debounced;

	console.log(data);
  const consultaApi = async() => {
		console.log('ee');
		if (!busqueda) return [];
		console.log('eee');
    const url = "https://api.dictionaryapi.dev/api/v2/entries/en/"
    fetch(`${url}${busqueda}`)
			.then((response) => response.json())
			.then((data) => {
				return data
			})
			.catch (error => {				
				return [];
			})
  }
  const query = useQuery(
    ['DiCE'],
		() => {

			if (!busqueda) return [];
			console.log('eee');
			const url = "https://api.dictionaryapi.dev/api/v2/entries/en/"
			fetch(`${url}${busqueda}`)
				.then((response) => response.json())
				.then((data) => {
					console.log('a');
					// console.log(data);
					return data
				})
				.catch (error => {				
					console.log('b');
					return [];
				})
		}
  )
	console.log(query.data);
	const ejecutarBusqueda = () => {
		console.log(debounced);
		if (debounced) clearTimeout(debounced);

		debounced = setTimeout(() => {
			console.log('e');
			query.refetch
		}, 80);
	}

	function autoComa(array) {
		let modificado = ''
		array.forEach((x, i) => {
			if (i !== 0) {
				modificado += ', ' 
			}
			modificado += x
		})
		return modificado
		
	}

	return (
		<section className="h-screen">
			<div className="flex justify-end m-4">
				<SwitchDarkMode />
			</div>
			<header className="grid grid-cols-2 w-screen md:w-2/4 md:mx-auto">
				<div className="">
					<img
						className="inline-block h-32"
						src="/src/assets/DiCE Logo.png"
						alt=""
					/>
				</div>
				<p className="p-2 my-6">
					DiCE
					<span className="block">Dictionary</span>
				</p>
			</header>
			<section className="grid md:grid-cols-2 mx-3 mt-6 max-w-md gap-4 md:mx-auto">
				<div>
					<label htmlFor="busqueda" className="sr-only">
						Búsqueda
					</label>
					<input
						id="busqueda"
						value={busqueda}
						onChange={(e) => setbusqueda(e.target.value)}
						type="text"
						className="w-full flex-auto rounded-md border-0 px-3.5 py-2
            dark:bg-white/5
            dark:text-white
            shadow-sm
            ring-1 ring-inset ring-white/10 focus:ring-2 focus-visible:ring-indigo-400 focus-visible:outline-none focus:ring-indigo-500 sm:text-sm sm:leading-6"
						placeholder="Ingresa una palabra"
					/>
				</div>
				<button
					type="submit"
					// onClick={ejecutarBusqueda}
					onClick={query.refetch}
					className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
				>
					Busca
				</button>
			</section>
			{ data.map((d, id) => (
				<article key={id} className="border-t border-gray-600 dark:border-indigo-700 mt-9 mx-3 md:w-2/4 md:mx-auto">
					<div className="mt-3 text-3xl font-semibold text-[#fab54c]">
						{d.word}
					</div>
					<div className="mt-3 text-2xl font-semibold text-gray-900 dark:text-gray-200">
						phonetics
						{d.phonetics.map((p, ip) => (
							<p key={ip}>
								{p.audio ? (
								<audio controls>
									<source src={p.audio} type="audio/mp3"/>
									<source src={p.audio} type="audio/ogg"/>
								</audio>) 
								: (<></>)}
							</p>
						))}
					</div>
					{ d.meanings.map((m, im) => (
						<div key={im}>
							<p className="mt-3 text-2xl font-semibold text-gray-900 dark:text-gray-200">
								{m.partOfSpeech}
							</p>
							{ m.antonyms.length ? (
								<small className='dark:text-white' key={m.antonyms}> antonyms: {autoComa(m.antonyms)}</small>
								) : (<></>)}
							{ m.synonyms.length ? (
								<small className='dark:text-white' key={m.synonyms}> synonyms: {autoComa(m.synonyms)}</small>
								) : (<></>)}
							{ m.definitions ? (
								<>
								{ m.definitions.map((d2, id2) => (
									<div key={id2}>
										<p className='p-1 text-gray-500 dark:text-gray-400'>
											- {d2.definition}
										</p>
										{ d2.example ? (
											<p className='italic text-sm dark:text-gray-300'>Ejem: {d2.example}</p>
										) : (<></>)}
									</div>
								))}
								</>
							) : (<></>)}
						</div>
					))}
					<div className="text-sm mt-5 pb-10 text-gray-900 dark:text-gray-200">
						La siguiente información se ha obtenido de:
						{d.sourceUrls.map((url, iurl) => (
							<p key={iurl}>{url}</p>
						))}
					</div>
				</article>
			))}
		</section>
	);
}
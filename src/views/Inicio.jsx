import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import SwitchDarkMode from '../components/SwitchDarkMode';
import ClipLoader from "react-spinners/ClipLoader";

export default function Inicio() {
	const [busqueda, setbusqueda] = useState('');
	let debounced;

	const override = {
		display: "flex",
		margin: "0 auto",
		borderColor: "#fab54c",
	};
	
  const consultaApi = async() => {
		if (!busqueda) return {"title": "Ingresa una palabra a buscar", "message": "Recuerda que las palabras válidas son en inglés"};
    const url = "https://api.dictionaryapi.dev/api/v2/entries/en/"
		const res = await fetch(`${url}${busqueda}`)
		const datae = await res.json()
		return datae
  }

  const query = useQuery(
    ['DiCE'],
		consultaApi
  )

	const ejecutarBusqueda = () => {
		if (debounced) clearTimeout(debounced);
		debounced = setTimeout(() => {
			query.refetch()
		}, 1000);
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
					onClick={ejecutarBusqueda}
					className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
				>
					Busca
				</button>
			</section>
			{ query.data && !query.data.title && !query.isFetching ? (
				<>
					{ query.data.map((d, id) => (
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
				</>
			) : (
				<article className="border-t border-gray-600 dark:border-indigo-700 mt-9 mx-3 md:w-2/4 md:mx-auto">
					<div className="mt-3 text-3xl font-semibold text-[#fab54c]">
						{query.data && query.data.title ? query.data.title : ''}
					</div>
					{query.data && query.data.message ? query.data.message : ''}
				</article>
			)}

			<ClipLoader
        color="#fab54c"
        loading={query.isFetching}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
		</section>
	);
}
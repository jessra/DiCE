import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import SwitchDarkMode from '../components/SwitchDarkMode';

export default function Inicio() {
	const [busqueda, setbusqueda] = useState('');
  const consultaApi = async() => {
    if (!busqueda) return '';
    const url = "https://api.dictionaryapi.dev/api/v2/entries/en/"
    console.log(url);
    const res = await fetch(`${url}${busqueda}`)
    const resultado = await res.text()
    throw new Error("Ha sucedido un error")
    return resultado
  }
  const query = useQuery(
    ['DiCE'],
    consultaApi
  )

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
					onClick={()=>query.forceRefetch}
					className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
				>
					Busca
				</button>
			</section>
			<article className="border-t border-gray-600 dark:border-indigo-700 mt-9 mx-3 md:w-2/4 md:mx-auto">
				<p className="mt-3 text-xl font-semibold text-gray-900 dark:text-gray-200">
					Palabra que se busco
				</p>
				<p className="text-sm mt-5 text-gray-900 dark:text-gray-200">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos quae
					corrupti nemo porro eaque expedita molestias dolor accusantium, maiores dolorem.
					Ut mollitia non at aliquid, nostrum iste veniam maiores cumque?
				</p>
			</article>
		</section>
	);
}
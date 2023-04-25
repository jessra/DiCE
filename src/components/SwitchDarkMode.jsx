import { Switch } from '@headlessui/react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';

export default function SwitchDarkMode() {
	const [darkMode, setDarkMode] = useState(localStorage.getItem('color-theme') == 'dark' ? true : false);
	useEffect(() => {
		if ('color-theme' in localStorage && localStorage.getItem('color-theme') == 'dark') {
			document.documentElement.classList.add('dark');
			window.matchMedia('(prefers-color-scheme: dark)').matches;
			setDarkMode(true);
		}
	}, []);
	function toggleTheme() {
		if (darkMode) {
			localStorage.setItem('color-theme', 'light');
			document.documentElement.classList.remove('dark');
			window.matchMedia('(prefers-color-scheme: light)').matches;
		} else {
			localStorage.setItem('color-theme', 'dark');
			document.documentElement.classList.add('dark');
			window.matchMedia('(prefers-color-scheme: dark)').matches;
		}
	}
	return (
		<Switch
			checked={darkMode}
			onChange={setDarkMode}
			onClick={() => {
				toggleTheme();
			}}
			className={`${darkMode ? 'bg-indigo-800' : 'bg-indigo-400'}
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
		>
			{darkMode ? (
				<MoonIcon
					aria-hidden="true"
					className={`${darkMode ? 'translate-x-9' : 'translate-x-0'}
      pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
				/>
			) : (
				<SunIcon
					aria-hidden="true"
					className={`${darkMode ? 'translate-x-9' : 'translate-x-0'}
      pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
				/>
			)}
		</Switch>
	);
}

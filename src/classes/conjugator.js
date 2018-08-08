class Conjugator {
	teEnding = {
		る: 'って',
		つ: 'って',
		う: 'って',
		む: 'んで',
		ぬ: 'んで',
		ぶ: 'んで',
		く: 'いて',
		ぐ: 'いで',
		す: 'して'
	};

	aEnding = {
		る: 'ら',
		つ: 'た',
		う: 'わ',
		む: 'ま',
		ぬ: 'な',
		ぶ: 'ば',
		く: 'か',
		ぐ: 'が',
		す: 'さ'
	};

	iEnding = {
		る: 'り',
		つ: 'ち',
		う: 'い',
		む: 'み',
		ぬ: 'に',
		ぶ: 'び',
		く: 'き',
		ぐ: 'ぎ',
		す: 'し'
	};

	eEnding = {
		る: 'れ',
		つ: 'て',
		う: 'え',
		む: 'め',
		ぬ: 'ね',
		ぶ: 'べ',
		く: 'け',
		ぐ: 'げ',
		す: 'せ'
	};

	verbType = type => (type.match('五段') !== null ? 'godan' : 'ichidan');

	teForm(v, t) {
		const l = v.length;

		return this.verbType(t) === 'godan'
			? v.slice(0, l - 1) + teEnding[v.slice(l - 1, l)]
			: v.slice(0, l - 1) + 'て';
	}

	aForm(v, t) {}
}

export const c = new Conjugator();

console.log(c.teForm('食べる', '一段'));
console.log(c.teForm('飲む', '五段'));
console.log(c.teForm('書く', '五段'));
console.log(c.teForm('泳ぐ', '五段'));

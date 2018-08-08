class Conjugator {
	teArr = {
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

	aArr = {
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

	iArr = {
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

	eArr = {
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

	form = (v, t, endArr, end) => {
		const l = v.length;

		return this.verbType(t) === 'godan'
			? v.slice(0, l - 1) + endArr[v.slice(l - 1, l)]
			: v.slice(0, l - 1) + end;
	};

	//テ形
	tekei = (v, t) => this.form(v, t, this.teArr, 'て');

	//未然形
	mizenkei = (v, t) => this.form(v, t, this.aArr, '') + 'ない';
}

export const c = new Conjugator();

console.log(c.mizenkei('泳ぐ', '五段'));
console.log(c.mizenkei('食べる', '一段'));
console.log(c.tekei('泳ぐ', '五段'));
console.log(c.tekei('食べる', '一段'));

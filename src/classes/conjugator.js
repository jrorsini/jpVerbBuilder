class Conjugator {
	verbType(type) {
		return type.match('五段') !== null ? 'godan' : 'ichidan';
	}

	teForm(v, t) {
		const teEnding = {
			る: 'って',
			つ: 'って',
			う: 'って',
			く: 'いて',
			ぐ: 'いで',
			む: 'んで',
			ぬ: 'んで',
			ぶ: 'んで',
			す: 'して'
		};

		return this.verbType(t) === 'godan'
			? v.slice(0, v.length - 1) + teEnding[v.split('').pop()]
			: v.slice(0, v.length - 1) + 'て';
	}
}

export const c = new Conjugator();

console.log(c.teForm('食べる', '一段'));
console.log(c.teForm('飲む', '五段'));
console.log(c.teForm('書く', '五段'));
console.log(c.teForm('泳ぐ', '五段'));

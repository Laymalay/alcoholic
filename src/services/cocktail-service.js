export default class CocktailService {

    _apiBase = 'https://the-cocktail-db.p.rapidapi.com';

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`, {
            "headers": {
                "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
                "x-rapidapi-key": "e45ed382b9mshfc0bb2081bc364ep15543ejsn720457523c2c"
            }
        });

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
                `, received ${res.status}`)
        }
        return await res.json();
    }

    async getCocktails(filter) {
        let query = '';
        if (filter.category){
            query+=`c=${filter.category}`;
        }
        if (filter.glass){
            query+=`g=${filter.glass}`;
        }
        if (filter.alcohol){
            query+=`a=${filter.alcohol}`;
        }
        const res = await this.getResource(`/filter.php?${query}`);
        return res.drinks;
    }  
    
    async getCocktail(cocktail_id){
        const res = await this.getResource(`/lookup.php?i=${cocktail_id}`); 
        return res.drinks;
    }
    async getRandomCocktail() {
        const res = await this.getResource(`/random.php`); 
        return res.drinks;
    }

    async getCocktailsFilters(field = 'a') {
        const res = await this.getResource(`/list.php?${field}=list`);
        return res;
    }

}
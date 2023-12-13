export class ServiceApi {
  constructor() {
    this.state = {
      url: new URL('https://api.themoviedb.org'),
      apiKey: '905e917ccfddc7effe602b7d5165147a',
    };
  }
  async getMovies(movieName) {
    let url = new URL('3/search/movie', this.state.url);
    url.searchParams.set('api_key', this.state.apiKey);
    url.searchParams.set('query', movieName);
    try {
      const result = await fetch(url);
      if (!result.ok) throw new Error(`Failed to fetch: ${url} Description: ${result.statusText}`);
      return await result.json();
    } catch (e) {
      throw new Error('Error receiving movies');
    }
  }

  async getPopularMovies(page = 1) {
    let url = new URL('3/discover/movie', this.state.url);
    url.searchParams.set('api_key', this.state.apiKey);
    url.searchParams.set('sort_by', 'popularity.desc');
    url.searchParams.set('page', page);
    try {
      const result = await fetch(url);
      if (!result.ok) throw new Error(`Failed to Fetch: ${url} Description: ${result.statusText}`);
      return await result.json();
    } catch (e) {
      throw new Error('Error receiving movies');
    }
  }

  async getPageMovies(movieName, page) {
    let url = new URL('3/search/movie', this.state.url);
    url.searchParams.set('api_key', this.state.apiKey);
    url.searchParams.set('query', movieName);
    url.searchParams.set('page', page);
    try {
      const result = await fetch(url);
      if (!result.ok) throw new Error(`Failed to Fetch: ${url} Description: ${result.statusText}`);
      return await result.json();
    } catch (e) {
      throw new Error('Error receiving movies');
    }
  }

  async getGenres() {
    let url = new URL('3/genre/movie/list', this.state.url);
    url.searchParams.set('api_key', this.state.apiKey);
    try {
      const result = await fetch(url);
      if (!result.ok) {
        throw new Error('Failed to Fetch');
      }
      return await result.json();
    } catch (e) {
      throw new Error('Error receiving movies');
    }
  }
}

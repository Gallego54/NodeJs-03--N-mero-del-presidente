export default function primeProvider () {
    const primeCollection = [];

    const checkCollection = function( k ){
        return primeCollection.includes(k);
    }

    const addCollection = function( k ){
        primeCollection.push(k);
    }

    this.primeCheck = function( k ){
        if (checkCollection(k)) {
            return true;
        }

        for (let i=2 ; i<=k/2 ; i++) {
            if (!(k%i)) {
                return false;
            }
        }  addCollection(k); return true;
    }

    this.primeCheckRange = function( a, b ) {
        for (let i=a ; i<=b ; i++)
            this.primeCheck(i);
    }

    this.getPrimeCollec = function() {
        return primeCollection;
    }

    this.clearCollection = function () {
        primeCollection.length = 0;
    }

}






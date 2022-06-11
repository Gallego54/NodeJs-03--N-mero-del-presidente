import fs from 'fs'

const DIR = 'src/view/';
const DIR_ERR = DIR+'404.html';
const PathExits = [
    {
        route: '/result',
        path: DIR+'action.html'
    },
    {
        route: '/',
        path: DIR+'form.html'
    }
];

function getIndexPath ( RouteRequest ) {
    return PathExits.findIndex(element => element.route === RouteRequest );
}

function requestPath ( RouteRequest )  {
    const IndexPath = getIndexPath(RouteRequest);
    if ( IndexPath == -1 ) {
        return DIR_ERR; 
    } else {
        return PathExits[IndexPath].path;
    }
}

export default function getView ( RouteRequest, Action ){
    return fs.readFileSync(
        requestPath(RouteRequest), 
        {
            encoding:'utf8', 
            flag:'r'
        }

    );
}





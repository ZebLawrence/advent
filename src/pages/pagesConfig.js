const home = {
    name: 'Total',
    bodyClass: 'home',
    componentPath: 'home/home',
    path: '/'
};

const day1 = {
    name: 'Day 1',
    bodyClass: 'home',
    componentPath: 'home/Day1',
    path: '/day1'
};

const day2 = {
    name: 'Day 2',
    bodyClass: 'home',
    componentPath: 'home/Day2',
    path: '/day2'
};

const day3 = {
    name: 'Day 3',
    bodyClass: 'home',
    componentPath: 'home/Day3',
    path: '/day3'
};

const tree = {
    name: 'Tree',
    bodyClass: 'home',
    componentPath: 'home/Tree',
    path: '/tree'
};

const routeError = {
    name: 'Route Error',
    componentPath: 'routeError/routeError',
    bodyClass: 'route-error'
};

const pages = {
    home,
    day1,
    day2,
    day3,
    tree,
    routeError
};

const navItems = [
    home,
    day1,
    day2,
    day3,
    tree
];

export {
    pages,
    navItems
}
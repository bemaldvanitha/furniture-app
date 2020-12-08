import Furniture from '../modals/furniture';
import Category from '../modals/category';
import User from '../modals/user';

export const Users = [
    new User(
        'u1',
        'peter furniture',
        'peterruf@gmail.com',
        '+94783707270',
        '1/7,5th cross road,new york',
        'https://cdn.pixabay.com/photo/2020/09/27/08/47/castle-5606120_960_720.jpg',
        true,
        ''
    ),
    new User(
        'u2',
        'james furniture',
        'james123@gmail.com',
        '+94718452548',
        '112,4th cross road,new york',
        'https://cdn.pixabay.com/photo/2020/09/08/09/12/mountains-5554085_1280.jpg',
        true,
        ''
    ),
    new User(
        'u3',
        'nova furniture',
        'nova123@gmail.com',
        '+94778947555',
        '12,walter road,new york',
        'https://cdn.pixabay.com/photo/2020/06/29/17/26/photographer-5353515_1280.jpg',
        true,
        ''
    ),
    new User(
        'u4',
        'sam furniture',
        'sampatric@gmail.com',
        '+94784457856',
        '4,san serif road,new york',
        'https://cdn.pixabay.com/photo/2020/04/15/12/12/flowers-5046413_1280.jpg',
        true,
        ''
    ),
];

export const Categories = [
    new Category(
        'c1',
        'chair',
        'https://cdn.pixabay.com/photo/2016/11/19/15/50/chair-1840011_1280.jpg'
    ),
    new Category(
        'c2',
        'table',
        'https://cdn.pixabay.com/photo/2016/03/26/13/09/notebook-1280538_1280.jpg'
    ),
    new Category(
        'c3',
        'bed',
        'https://cdn.pixabay.com/photo/2015/11/07/11/22/pillows-1031079_1280.jpg'
    ),
    new Category(
        'c4',
        'office item',
        'https://cdn.pixabay.com/photo/2017/05/04/16/37/meeting-2284501_1280.jpg'
    ),
    new Category(
        'c5',
        'sofa',
        'https://cdn.pixabay.com/photo/2016/11/18/17/20/couch-1835923_1280.jpg'
    ),
    new Category(
        'c6',
        'other',
        'https://cdn.pixabay.com/photo/2017/03/13/20/19/architecture-2141045_1280.jpg'
    ),
];

export const Products = [
    new Furniture(
        'f1',
        'u1',
        'c1',
        'black wood chair',
        'nice black wood chair',
        100,
        4,
        'https://cdn.pixabay.com/photo/2016/11/19/15/50/chair-1840011_1280.jpg',
        4.8,
        'peter furniture',
        new Date().toISOString(),
        ['red','black','brown','gray']
    ),
    new Furniture(
        'f2',
        'u1',
        'c3',
        'double bed',
        'nice double bed',
        1000,
        6,
        'https://cdn.pixabay.com/photo/2015/11/07/11/22/pillows-1031079_1280.jpg',
        4.7,
        'peter furniture',
        new Date().toISOString(),
        ['red','black','brown','gray']
    ),
    new Furniture(
        'f3',
        'u2',
        'c5',
        'sofa set',
        'creme color sofa set',
        1300,
        5,
        'https://cdn.pixabay.com/photo/2017/08/02/01/01/living-room-2569325_1280.jpg',
        4.2,
        'james furniture',
        new Date().toISOString(),
        ['red','black','brown','gray']
    ),
    new Furniture(
        'f4',
        'u2',
        'c5',
        'sofa set',
        'grey color sofa set',
        1250,
        6,
        'https://cdn.pixabay.com/photo/2018/05/02/09/02/baby-boy-3368016_1280.jpg',
        4.3,
        'james furniture',
        new Date().toISOString(),
        ['red','black','brown','gray']
    ),
    new Furniture(
        'f5',
        'u3',
        'c4',
        'computer table',
        'large computer table',
        250,
        4,
        'https://cdn.pixabay.com/photo/2016/11/18/13/03/apple-1834328_1280.jpg',
        4.7,
        'nova furniture',
        new Date().toISOString(),
        ['red','black','brown','gray']
    ),
    new Furniture(
        'f6',
        'u3',
        'c4',
        'office meting table',
        'large meting table with 18 chairs',
        5900,
        2,
        'https://cdn.pixabay.com/photo/2015/05/15/14/22/conference-room-768441_1280.jpg',
        4.8,
        'nova furniture',
        new Date().toISOString(),
        ['red','black','brown','gray']
    ),
    new Furniture(
        'f7',
        'u3',
        'c6',
        'nursery cot',
        'pink nursery cot',
        750,
        5,
        'https://cdn.pixabay.com/photo/2015/12/05/23/38/nursery-1078923_1280.jpg',
        4.2,
        'nova furniture',
        new Date().toISOString(),
        ['red','black','brown','gray']
    ),
    new Furniture(
        'f8',
        'u4',
        'c2',
        'dining table',
        'dining table set',
        2500,
        4,
        'https://cdn.pixabay.com/photo/2016/11/18/14/05/brick-wall-1834784_1280.jpg',
        3.8,
        'sam furniture',
        new Date().toISOString(),
        ['red','black','brown','gray']
    ),
    new Furniture(
        'f9',
        'u4',
        'c2',
        'dining table',
        'dining table set',
        3500,
        2,
        'https://cdn.pixabay.com/photo/2018/01/26/08/15/dining-room-3108037_1280.jpg',
        4.6,
        'sam furniture',
        new Date().toISOString(),
        ['red','black','brown','gray']
    ),
    new Furniture(
        'f10',
        'u4',
        'c1',
        'chair',
        'sofa chair',
        1500,
        4,
        'https://cdn.pixabay.com/photo/2015/05/26/19/40/chair-in-field-785232_1280.jpg',
        4.5,
        'sam furniture',
        new Date().toISOString(),
        ['red','black','brown','gray']
    ),
    new Furniture(
        'f11',
        'u4',
        'c1',
        'chair',
        'purple sofa chair',
        1700,
        5,
        'https://cdn.pixabay.com/photo/2019/03/21/03/29/chair-4070161_960_720.png',
        4.2,
        'sam furniture',
        new Date().toISOString(),
        ['red','black','brown','gray']
    ),
    new Furniture(
        'f12',
        'u4',
        'c6',
        'living room set',
        'living room kit',
        3500,
        4,
        'https://cdn.pixabay.com/photo/2017/03/19/01/18/living-room-2155353_1280.jpg',
        4.3,
        'sam furniture',
        new Date().toISOString(),
        ['red','black','brown','gray']
    ),
];


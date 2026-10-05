import type { Project } from '../types/models';

export const projects: Project[] = [
  {
    id: 'coaster',
    title: 'Willow Coaster',
    difficulty: 'Easy',
    category: 'Practical',
    hours: 1,
    description:
      'A simple flat project for practising basic over-and-under weaving.',
    image: require('../assets/willow-coaster-step-4.png'),
    steps: [
      {
        text: 'Arrange several willow spokes in a cross-shaped base.',
        image: require('../assets/willow-coaster-step-1.png'),
      },
      {
        text: 'Weave a thin flexible rod over and under the spokes.',
        image: require('../assets/willow-coaster-step-2.png'),
      },
      {
        text: 'Continue in a circle, keeping the rows close and even.',
        image: require('../assets/willow-coaster-step-3.png'),
      },
      {
        text: 'Trim the ends and tuck them securely into the weave.',
        image: require('../assets/willow-coaster-step-4.png'),
      },
    ],
  },
  {
    id: 'star',
    title: 'Mini Woven Star',
    difficulty: 'Easy',
    category: 'Decoration',
    hours: 1,
    description:
      'A small decorative star made by weaving flexible willow rods around a simple frame.',
    image: require('../assets/willow-mini-woven-star-step-4.png'),
    steps: [
      {
        text: 'Arrange five straight willow spokes into a star-shaped frame.',
        image: require('../assets/willow-mini-woven-star-step-1.png'),
      },
      {
        text: 'Secure the crossing points with thin flexible willow.',
        image: require('../assets/willow-mini-woven-star-step-2.png'),
      },
      {
        text: 'Weave around the frame to define and strengthen each point.',
        image: require('../assets/willow-mini-woven-star-step-3.png'),
      },
      {
        text: 'Trim the ends and add a small loop for hanging.',
        image: require('../assets/willow-mini-woven-star-step-4.png'),
      },
    ],
  },
  {
    id: 'basket',
    title: 'Simple Willow Basket',
    difficulty: 'Medium',
    category: 'Practical',
    hours: 4,
    description:
      'A classic small basket for practising a base, upright stakes, and woven walls.',
    image: require('../assets/willow-simple-willow-basket-step-4.png'),
    steps: [
      {
        text: 'Build a flat basket base by weaving willow rods around evenly spaced spokes.',
        image: require('../assets/willow-simple-willow-basket-step-1.png'),
      },
      {
        text: 'Bend the spokes upward to form the basket’s upright stakes.',
        image: require('../assets/willow-simple-willow-basket-step-2.png'),
      },
      {
        text: 'Weave flexible rods around the stakes to create the basket walls.',
        image: require('../assets/willow-simple-willow-basket-step-3.png'),
      },
      {
        text: 'Fold the stakes into a finished rim and trim any loose ends.',
        image: require('../assets/willow-simple-willow-basket-step-4.png'),
      },
    ],
  },
  {
    id: 'plant-holder',
    title: 'Woven Plant Holder',
    difficulty: 'Medium',
    category: 'Garden',
    hours: 3,
    description:
      'A decorative holder that uses an open weave and a sturdy hanging loop.',
    image: require('../assets/willow-woven-plant-holder-step-4.png'),
    steps: [
      {
        text: 'Weave a small circular base around evenly spaced willow spokes.',
        image: require('../assets/willow-woven-plant-holder-step-1.png'),
      },
      {
        text: 'Raise the spokes and weave open rows around them.',
        image: require('../assets/willow-woven-plant-holder-step-2.png'),
      },
      {
        text: 'Shape the top and secure the final row around the rim.',
        image: require('../assets/willow-woven-plant-holder-step-3.png'),
      },
      {
        text: 'Attach a braided willow loop and check that it is firmly secured.',
        image: require('../assets/willow-woven-plant-holder-step-4.png'),
      },
    ],
  },
  {
    id: 'tray',
    title: 'Willow Tray',
    difficulty: 'Medium',
    category: 'Practical',
    hours: 3,
    description:
      'A shallow rectangular tray with a firm base and neatly finished edges.',
    image: require('../assets/willow-tray-step-4.png'),
    steps: [
      {
        text: 'Arrange willow spokes into a rectangular base and begin weaving across them.',
        image: require('../assets/willow-tray-step-1.png'),
      },
      {
        text: 'Continue the flat weave until the base reaches the desired size.',
        image: require('../assets/willow-tray-step-2.png'),
      },
      {
        text: 'Bend the edge spokes upward slightly and weave a low border around the tray.',
        image: require('../assets/willow-tray-step-3.png'),
      },
      {
        text: 'Finish the corners, tuck in the ends, and trim excess willow.',
        image: require('../assets/willow-tray-step-4.png'),
      },
    ],
  },
  {
    id: 'bread-basket',
    title: 'Round Bread Basket',
    difficulty: 'Medium',
    category: 'Practical',
    hours: 5,
    description:
      'A rounded basket with close weaving and a strong rim for everyday use.',
    image: require('../assets/willow-round-bread-basket-step-4.png'),
    steps: [
      {
        text: 'Weave a round base from willow spokes and flexible weaving rods.',
        image: require('../assets/willow-round-bread-basket-step-1.png'),
      },
      {
        text: 'Raise the spokes gradually and shape them into rounded sides.',
        image: require('../assets/willow-round-bread-basket-step-2.png'),
      },
      {
        text: 'Weave close rows around the sides, adjusting the shape as you go.',
        image: require('../assets/willow-round-bread-basket-step-3.png'),
      },
      {
        text: 'Finish the rim securely and trim the remaining ends.',
        image: require('../assets/willow-round-bread-basket-step-4.png'),
      },
    ],
  },
  {
    id: 'wreath',
    title: 'Decorative Wreath',
    difficulty: 'Easy',
    category: 'Decoration',
    hours: 2,
    description:
      'A lightweight willow wreath that can be shaped into a simple home decoration.',
    image: require('../assets/willow-decorative-wreath-step-4.png'),
    steps: [
      {
        text: 'Soak several long, flexible willow rods until they bend easily.',
        image: require('../assets/willow-decorative-wreath-step-1.png'),
      },
      {
        text: 'Curve the first rod into a circle and overlap its ends.',
        image: require('../assets/willow-decorative-wreath-step-2.png'),
      },
      {
        text: 'Wrap more rods around the circle to build and secure the wreath.',
        image: require('../assets/willow-decorative-wreath-step-3.png'),
      },
      {
        text: 'Tuck in the ends and adjust the shape into an even ring.',
        image: require('../assets/willow-decorative-wreath-step-4.png'),
      },
    ],
  },
  {
    id: 'lantern',
    title: 'Small Willow Lantern',
    difficulty: 'Advanced',
    category: 'Lighting',
    hours: 6,
    description:
      'An open-sided decorative lantern frame made with a simple woven structure.',
    image: require('../assets/willow-small-willow-lantern-step-4.png'),
    steps: [
      {
        text: 'Weave a small square base from sturdy willow rods.',
        image: require('../assets/willow-small-willow-lantern-step-1.png'),
      },
      {
        text: 'Add upright rods at the corners and connect them with a top frame.',
        image: require('../assets/willow-small-willow-lantern-step-2.png'),
      },
      {
        text: 'Weave open panels between the uprights, leaving even spaces.',
        image: require('../assets/willow-small-willow-lantern-step-3.png'),
      },
      {
        text: 'Finish the edges and attach a willow handle to the top frame.',
        image: require('../assets/willow-small-willow-lantern-step-4.png'),
      },
    ],
  },
];

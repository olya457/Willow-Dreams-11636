import type { Article } from '../types/models';

export const articles: Article[] = [
  {
    id: 'choosing-willow-rods',
    title: 'Choosing Willow Rods',
    description:
      'Learn how rod length, thickness, and flexibility affect your project.',
    image: require('../assets/willow-choosing-willow-rods.png'),
    paragraphs: [
      'Willow rods come in different lengths and thicknesses, and each size suits a different part of a project. Thicker rods are often used for the frame because they provide support. Thinner, flexible rods are useful for weaving around that frame. For your first project, choose rods that bend without cracking.',
      'Check the rods for splits, brittle sections, and sharp side shoots before you begin. Try bending one gently to see how flexible it is. Keep rods of similar thickness together so they are easier to select while working. The right material makes the weaving process smoother and helps the finished piece hold its shape.',
    ],
    questions: [
      {
        statement: 'Thicker rods are often used to form a project’s frame.',
        answer: true,
      },
      {
        statement: 'Brittle rods are the best choice for tight weaving.',
        answer: false,
      },
    ],
  },
  {
    id: 'preparing-willow-rods',
    title: 'Preparing Willow Rods',
    description: 'Find out how to make willow flexible and ready for weaving.',
    image: require('../assets/willow-preparing-willow-rods.png'),
    paragraphs: [
      'Dry willow usually needs to be soaked before it is woven. Place the rods in a container of water and make sure they are fully covered. The soaking time depends on the rods’ thickness, dryness, and condition. Check their flexibility rather than relying on one fixed time.',
      'When the rods bend smoothly, take out only the amount you plan to use. Keep the remaining rods covered so they do not dry out while you work. If a rod still feels stiff, return it to the water for longer. Proper preparation helps reduce snapping during weaving.',
    ],
    questions: [
      {
        statement: 'Soaking time can vary depending on the willow rods.',
        answer: true,
      },
      {
        statement:
          'Every willow rod is ready to weave after the same fixed soaking time.',
        answer: false,
      },
    ],
  },
  {
    id: 'essential-weaving-tools',
    title: 'Essential Weaving Tools',
    description:
      'Get to know the basic tools that can make willow weaving easier.',
    image: require('../assets/willow-essential-weaving-tools.png'),
    paragraphs: [
      'You can begin simple willow projects with just a few basic tools. Secateurs help trim rods to the length you need. A bodkin or awl can create space between woven rods, while a small knife can help with careful shaping. Choose tools that feel comfortable and are suitable for working with natural material.',
      'Keep your tools close by before starting so you do not have to interrupt your work. Use a stable surface and trim rods carefully, directing sharp tools away from your hands. Store cutting tools safely when they are not in use. A tidy workspace makes it easier to follow each step.',
    ],
    questions: [
      { statement: 'Secateurs can be used to trim willow rods.', answer: true },
      {
        statement: 'Sharp tools should be left loose on the work surface.',
        answer: false,
      },
    ],
  },
  {
    id: 'building-a-strong-base',
    title: 'Building a Strong Base',
    description: 'Learn why a well-made base helps a basket keep its shape.',
    image: require('../assets/willow-building-a-strong-base.png'),
    paragraphs: [
      'The base is the foundation of a basket, so its rods should be arranged evenly. The base structure provides points around which the side rods can be woven. Before you begin, check that the rods are placed symmetrically and spaced consistently. A balanced base makes it easier to build even walls.',
      'As you weave, keep the tension steady across the base. If one area is pulled much tighter than another, the shape may become uneven. Turn the work regularly so you can check it from different sides. Take time to correct the base before adding the walls.',
    ],
    questions: [
      {
        statement:
          'An evenly arranged base can help a basket keep a balanced shape.',
        answer: true,
      },
      {
        statement: 'The base does not affect the shape of the finished basket.',
        answer: false,
      },
    ],
  },
  {
    id: 'plain-weave',
    title: 'Plain Weave',
    description:
      'Explore the simple over-and-under pattern used in many woven projects.',
    image: require('../assets/willow-plain-weave.png'),
    paragraphs: [
      'Plain weave is made by passing one weaving rod over and under the frame rods in turn. On the next row, the pattern changes so the rod passes under and over the same frame rods. This alternating sequence creates a simple woven surface. It is a useful pattern to practise before trying more complex techniques.',
      'Keep each row close to the previous one without pulling the rods too tightly. Check that the over-and-under sequence stays consistent as you work. If the pattern slips, gently adjust the rods before continuing. Regular spacing helps the finished weave look neat.',
    ],
    questions: [
      {
        statement: 'Plain weave uses an alternating over-and-under sequence.',
        answer: true,
      },
      {
        statement:
          'Every row in plain weave follows exactly the same sequence.',
        answer: false,
      },
    ],
  },
  {
    id: 'adding-new-rods',
    title: 'Adding New Rods',
    description: 'Learn how to continue weaving when a rod becomes too short.',
    image: require('../assets/willow-adding-new-rods.png'),
    paragraphs: [
      'A weaving rod may run out before you reach the end of a row. To continue, prepare a new flexible rod and place its thicker end near the end of the old one. Continue weaving with the new rod, following the same over-and-under pattern. The overlap helps keep the weave connected.',
      'Try to add new rods in different places rather than joining them all at one point. This helps avoid creating a bulky area in the finished piece. Keep the weaving tension even around the join. Trim any protruding ends carefully once they are secure.',
    ],
    questions: [
      {
        statement:
          'A new rod can be added when the current weaving rod becomes too short.',
        answer: true,
      },
      {
        statement:
          'Adding every new rod at the same spot helps create an even weave.',
        answer: false,
      },
    ],
  },
  {
    id: 'shaping-basket-walls',
    title: 'Shaping Basket Walls',
    description:
      'Discover how to guide the rods as the basket sides take shape.',
    image: require('../assets/willow-shaping-basket-walls.png'),
    paragraphs: [
      'Once the base is ready, the upright frame rods become the supports for the basket walls. Bend them upward gradually instead of forcing them sharply into position. Weave around the supports while keeping the rows close and the tension steady. This helps the basket walls rise evenly from the base.',
      'Check the basket’s shape often as you work. If one side begins to lean, adjust the rods gently before adding more rows. You can use a simple form or guide to help maintain the intended shape. Slow, regular adjustments are easier than correcting a large distortion later.',
    ],
    questions: [
      {
        statement: 'Upright frame rods support the walls of a basket.',
        answer: true,
      },
      {
        statement:
          'It is best to force the rods into a sharp bend all at once.',
        answer: false,
      },
    ],
  },
  {
    id: 'finishing-and-caring',
    title: 'Finishing and Caring for Willow',
    description:
      'Learn how to finish the edges and look after a completed willow piece.',
    image: require('../assets/willow-finishing-and-caring-for-willow.png'),
    paragraphs: [
      'When you reach the top of a basket, finish the edge so the ends are held securely. Fold or weave the frame rods into the top edge according to the project instructions. Trim excess material carefully after the rods are secure. Check the rim for loose ends and uneven sections.',
      'Let the finished piece dry in a place with good airflow, away from direct heat. Avoid leaving willow in a damp area for long periods. Dust the surface gently and handle the piece with care. If the weave loosens over time, make small adjustments before the area changes shape further.',
    ],
    questions: [
      {
        statement:
          'A finished willow piece should be dried away from direct heat.',
        answer: true,
      },
      {
        statement: 'Loose ends should be trimmed before they are secured.',
        answer: false,
      },
    ],
  },
];

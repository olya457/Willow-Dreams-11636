import type { Pattern } from '../types/models';

export const patterns: Pattern[] = [
  {
    id: 'plain',
    title: 'Plain Weave',
    image: require('../assets/willow-plain-weave.png'),
    description:
      'Plain weave passes a flexible rod over and under the upright stakes in an alternating sequence. On the next row, the sequence reverses. This creates a simple, even pattern that works well for many basket walls. Keep the rows close together and the tension consistent.',
  },
  {
    id: 'twining',
    title: 'Two-Rod Twining',
    image: require('../assets/willow-two-rod-twining.png'),
    description:
      'Two weaving rods wrap around the upright stakes together. Each rod crosses over the other between stakes, creating a twisted line. This technique makes a sturdy band and can help hold the stakes in place. Keep the crossings neat so the pattern stays even.',
  },
  {
    id: 'waling',
    title: 'Three-Rod Waling',
    image: require('../assets/willow-three-rod-waling.png'),
    description:
      'Three rods weave around the upright stakes to form a strong, raised band. The rods take turns passing in front of and behind the stakes. Waling is often used to strengthen a basket or mark a change in its pattern. Keep the rods flexible and follow the same sequence around the work.',
  },
  {
    id: 'randing',
    title: 'Randing',
    image: require('../assets/willow-randing.png'),
    description:
      'Randing uses one or more rods to weave rows around the upright stakes. Each new row continues around the basket, building its sides. The rods should sit close together without overlapping unevenly. This technique is useful for creating a smooth, compact surface.',
  },
  {
    id: 'open',
    title: 'Open Weave',
    image: require('../assets/willow-open-weave.png'),
    description:
      'Open weave leaves visible spaces between the woven rods. The gaps create a light pattern and allow air to pass through the finished piece. Keep the spacing consistent so the design looks balanced. This style works well for decorative baskets and airy containers.',
  },
  {
    id: 'diagonal',
    title: 'Diagonal Weave',
    image: require('../assets/willow-diagonal-weave.png'),
    description:
      'Diagonal weave creates slanted lines across the surface of the piece. The rods follow a repeating path that shifts the pattern as it moves around the stakes. The result has more movement than a basic horizontal weave. Check the angle regularly to keep the lines consistent.',
  },
  {
    id: 'stake',
    title: 'Stake-and-Strand Weave',
    image: require('../assets/willow-stake-and-strand-weave.png'),
    description:
      'This method uses upright stakes as the structure and flexible strands as the weaving material. The strands travel around the stakes to form the base or walls of a basket. The spacing and tension determine how firm the weave becomes. It is a useful foundation for learning how basket shapes are built.',
  },
  {
    id: 'rope',
    title: 'Rope Border',
    image: require('../assets/willow-rope-border.png'),
    description:
      'A rope border is made by twisting or pairing rods around the rim of a woven piece. It creates a rounded, decorative edge and helps finish the top of a basket. Keep the rods evenly tensioned as you work around the rim. Tuck and trim the ends securely when the border is complete.',
  },
];

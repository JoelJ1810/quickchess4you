export interface Puzzle {
  id: number;
  fen: string;
  moves: string[];
  description: string;
}

export const puzzles: Puzzle[] = [
  {
    id: 1,
    fen: "r2qk2r/pb4pp/1n2Pb2/2B2Q2/p1p5/2P5/2B2PPP/RN2R1K1 w - - 1 0",
    moves: ["f5f7"],
    description: "Find the checkmate in 1 move"
  },
  {
    id: 2,
    fen: "2r1nrk1/p4p1p/1p1p4/3P4/4p1b1/1B2P2P/PP3PP1/R4RK1 b - - 0 1",
    moves: ["g4f3"],
    description: "Find the best move for black"
  },
  {
    id: 3,
    fen: "r2qkb1r/pp2nppp/3p4/2pNN1B1/2BnP3/3P4/PPP2PPP/R2bK2R w KQkq - 1 0",
    moves: ["d5f6"],
    description: "Find the checkmate in 1 move"
  },
  {
    id: 4,
    fen: "r1b2rk1/2q1b1pp/p2ppn2/1p6/3QP3/1BN1B3/PPP3PP/R4RK1 w - - 0 1",
    moves: ["d4h8"],
    description: "Find the checkmate in 1 move"
  },
  {
    id: 5,
    fen: "r1b3kr/ppp1Bp1p/1b6/n2P4/2p3q1/2Q2N2/P4PPP/RN2R1K1 w - - 1 0",
    moves: ["c3g7"],
    description: "Find the checkmate in 1 move"
  },
  {
    id: 6,
    fen: "3r1rk1/1p3pp1/p3pb2/1p6/3P1B2/1P2P3/P3BPPP/R5K1 b - - 0 1",
    moves: ["d8d4"],
    description: "Find the best move for black"
  },
  {
    id: 7,
    fen: "r2q1rk1/4bppp/p2p4/2p3B1/3b1Q2/2N5/PPP2PPP/2KR1B1R w - - 1 0",
    moves: ["f4f7"],
    description: "Find the checkmate in 1 move"
  },
  {
    id: 8,
    fen: "r4rk1/p1p1qppp/2p5/2b5/4B3/P1P1Q3/1P3PPP/R2R2K1 w - - 0 1",
    moves: ["e4h7"],
    description: "Find the checkmate in 1 move"
  },
  {
    id: 9,
    fen: "r1b2rk1/pppp1ppp/8/4n3/2B1R3/2P1B3/P1P3PP/R5K1 w - - 1 0",
    moves: ["e4e8"],
    description: "Find the checkmate in 1 move"
  },
  {
    id: 10,
    fen: "5rk1/1p3ppp/p3p3/8/3N4/2P1K2P/PP3PP1/3r4 w - - 0 1",
    moves: ["d4f5"],
    description: "Find the best move for white"
  }
]; 
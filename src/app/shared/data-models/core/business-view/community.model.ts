export class Community {
  github: GitHubData;
  stackoverflow: StackOverflowData;

  constructor(github: GitHubData, stackoverflow: StackOverflowData) {
    this.github = github;
    this.stackoverflow = stackoverflow;
  }
}

class GitHubData {
  stars: number;
  forks: number;
  issues: number;
  commits: number;
  contributors: number;
  references: string[];

  constructor(stars: number,
              forks: number,
              issues: number,
              commits: number,
              contributors: number,
              references: string[]) {
    this.stars = stars;
    this.forks = forks;
    this.issues = issues;
    this.commits = commits;
    this.contributors = contributors;
    this.references = references;
  }
}

class StackOverflowData {
  questions: number;
  references: string[];

  constructor(questions: number, references: string[]) {
    this.questions = questions;
    this.references = references;
  }
}


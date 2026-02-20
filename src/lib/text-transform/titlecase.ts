export function titleCase(text: string): string {
  const words = text.split(' ');
  const titleCaseWords = words.map(word => {
    const lowerCaseWord = word.toLowerCase();
    return lowerCaseWord.charAt(0).toUpperCase() + lowerCaseWord.slice(1);
  });

  return titleCaseWords.join(' ');
}

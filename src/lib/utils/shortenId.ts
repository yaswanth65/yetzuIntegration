export const shortenId = (id: string, prefixLength = 8): string => {
  if (!id || id.length <= prefixLength) return id;
  return `${id.slice(0, prefixLength)}...${id.slice(-4)}`;
};

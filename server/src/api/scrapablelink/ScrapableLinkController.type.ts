interface AddScrapableLinkRequestDTO {
  links: string[];
}

interface AddScrapableLinkResponseDTO {
  status: "Success";
}

export { AddScrapableLinkRequestDTO, AddScrapableLinkResponseDTO };

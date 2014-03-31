json.(@board, :id, :title)

json.array!(@lists) do |list|
	json.(list, :id, :title, :rank, :board_id)
	json.array!(list.cards) do |card|
		json.(card, :id, :title, :rank, :list_id)
	end
end
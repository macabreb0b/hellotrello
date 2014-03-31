class AddListIdToCards < ActiveRecord::Migration
  def change
    add_column :cards, :list_id, :integer#,  null: false
  end
end

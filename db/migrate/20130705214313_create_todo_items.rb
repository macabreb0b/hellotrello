class CreateTodoItems < ActiveRecord::Migration
  def change
    create_table :todo_items do |t|
      t.integer :card_id, null: false
      t.boolean :done, default: false

      t.timestamps
    end
  end
end

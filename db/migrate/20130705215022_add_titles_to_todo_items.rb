class AddTitlesToTodoItems < ActiveRecord::Migration
  def change
    add_column :todo_items, :title, :string#, null: false
  end
end

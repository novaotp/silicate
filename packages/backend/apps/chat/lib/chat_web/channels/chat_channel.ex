defmodule ChatWeb.ChatChannel do
  use Phoenix.Channel

  def join("chat:lobby", payload, socket) do
    {:ok, socket}
  end

  def handle_in("send_message", %{"content" => content}, socket) do
    broadcast!(socket, "new_message", %{content: content})
    {:noreply, socket}
  end
end

# coding: utf-8
import wx, wx.html2
import os
from xml.dom import minidom
import urllib
"""
#
TODO	
poder trocar de feed
deletar feed
fazer filtro de notícia
fazer persistência de feeds
"""


class MainWindow(wx.Frame):
	def __init__(self, parent, title):
		self.dirname=''

		# A "-1" in the size parameter instructs wxWidgets to use the default size.
		# In this case, we select 200px width and the default height.
		wx.Frame.__init__(self, parent, title=title, size=(200,-1))
		self.news_btns = {}
		self.feeds = []
		self.web_view = wx.html2.WebView.New(self)
		self.sizer_news = wx.BoxSizer(wx.VERTICAL)
		self.sizer_news.SetVirtualSizeHints(self)
		self.CreateStatusBar() # A Statusbar in the bottom of the window

		filemenu= wx.Menu()
		# Setting up the menu.
		menuOpen = filemenu.Append(wx.ID_OPEN, "&Open"," Open a file to edit")
		menuAbout= filemenu.Append(wx.ID_ABOUT, "&About"," Information about this program")
		menuExit = filemenu.Append(wx.ID_EXIT,"E&xit"," Terminate the program")
		menuExit = filemenu.Append(wx.ID_EXIT,"E&xit"," Terminate the program")

		# Creating the menubar.
		menuBar = wx.MenuBar()
		menuBar.Append(filemenu,"&File") # Adding the "filemenu" to the MenuBar
		self.SetMenuBar(menuBar)  # Adding the MenuBar to the Frame content.

		self.buttons = []
		addRSSBtn = wx.Button(self, -1, u"Adicionar Página")
		self.buttons.append(addRSSBtn)

		# Events.
		self.Bind(wx.EVT_MENU, self.OnOpen, menuOpen)
		self.Bind(wx.EVT_BUTTON, self.OnOpen, addRSSBtn)
		self.Bind(wx.EVT_MENU, self.OnExit, menuExit)
		self.Bind(wx.EVT_MENU, self.OnAbout, menuAbout)

		self.sizer2 = wx.BoxSizer(wx.VERTICAL)
		self.sizer2.Add(addRSSBtn, 1, wx.SHAPED)

		# Use some sizers to see layout options
		self.sizer = wx.BoxSizer(wx.HORIZONTAL)
		self.sizer.Add(self.sizer2, 0, wx.EXPAND)
		self.sizer.Add(self.sizer_news,1,wx.EXPAND)
		self.sizer.Add(self.web_view, 2, wx.EXPAND)
		#Layout sizers
		self.SetSizer(self.sizer)
		self.SetAutoLayout(1)
		self.sizer.Fit(self)
		self.Show()

	def OnAbout(self,e):
		# Create a message dialog box
		dlg = wx.MessageDialog(self, " A sample editor \n in wxPython", "About Sample Editor", wx.OK)
		dlg.ShowModal() # Shows it
		dlg.Destroy() # finally destroy it when finished.

	def OnExit(self,e):
		self.Close(True)  # Close the frame.

	def OnOpen(self,e):
		dlg = wx.TextEntryDialog(self, "Paste the url Rss-Reader")
		if dlg.ShowModal() == wx.ID_OK:
			url = dlg.GetValue()
			feed = Feed(url)
			self.feeds.append(feed)
			self.current_feed = feed
			# TODO: LIMPAR NOTÍCIAS DO FEED CORRENTE PARA COLOCAR AS NOVAS
			button = wx.Button(self, -1, feed.src_name)
			self.buttons.append(button)
			self.sizer2.Add(button, 1, wx.SHAPED)
			for new in feed.news:
				button = wx.Button(self, -1, new.title)
				self.Bind(wx.EVT_BUTTON, self.load_link, button)
				self.sizer_news.Add(button, 1, wx.SHAPED)
		dlg.Destroy()

	def load_link(self, e):
		btn = e.GetEventObject()
		label = btn.GetLabel()
		for news in self.current_feed.news:
			if news.title == label:
				self.web_view.LoadURL(news.link)


class  Feed ():
	def __init__(self, url):
		xml_str = urllib.urlopen(url).read()
		self.doc = minidom.parseString(xml_str)

		self.items = self.doc.getElementsByTagName('item')
		self.src_name = self.doc.getElementsByTagName('title')[0].childNodes[News.item_children['title']].data
		self.news = []
		for item in self.items:
			new = News(item)
			self.news.append(new)


class News ():
	item_children = {
		'title': 0,
		'link': 1,
		'description': 2,
		'category': 3,
		'pubDate': 4
	}
	def __init__(self, xml_item):
		self.item_children = {
			'title': 0,
			'link': 1,
			'description': 2,
			'category': 3,
			'pubDate': 4
		}
		self.xml_item= xml_item
		for child in self.item_children:
			setattr(self, child, self.get_item_child(child))

	def get_item_child(self, child):
		"""
		given a child of item, that corresponds to one of the
		itemChildren, returns the data of the child
		:param child: string that is related to one of the children in itemChildrenDict
		:return: data of the child
		"""
		return self.xml_item.childNodes[self.item_children[child]].childNodes[0].data



app = wx.App(False)
frame = MainWindow(None, "Sample editor")
app.MainLoop()

/**
 * Parser 插件包打包工具
 * @tutorial https://github.com/jin-yufeng/Parser
 * @author JinYufeng
*/
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.ItemEvent;
import java.awt.event.ItemListener;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.text.DecimalFormat;
import java.util.regex.Matcher;

import javax.swing.ButtonGroup;
import javax.swing.JButton;
import javax.swing.JCheckBox;
import javax.swing.JFileChooser;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JRadioButton;
import javax.swing.JTextField;
import javax.swing.filechooser.FileSystemView;

public class pack {
	public static void main(String[] arr) {
		new core();
	}
}

class core {
	// 使用平台
	JRadioButton typeWx;
	JRadioButton typeQq;
	JRadioButton typeBd;
	JRadioButton typeMy;
	JRadioButton typeTt;
	JRadioButton typeUniApp;
	// 扩展包
	JCheckBox emoji;
	JCheckBox document;
	JCheckBox CssHandler;
	JCheckBox audio;
	JCheckBox search;
	// 是否 min 版本
	boolean isMin = false;

	// 包大小
	final float wxSize = 42.7f;
	final float wxMinSize = 26.8f;
	final float qqSize = 42.2f;
	final float bdSize = 40.6f;
	final float mySize = 41.0f;
	final float ttSize = 41.5f;
	final float uniAppSize = 60.0f;
	final float emojiSize = 4.21f;
	final float emojiMinSize = 3.12f;
	final float domSize = 7.41f;
	final float domUniSize = 6.32f;
	final float domMinSize = 5.17f;
	final float cssSize = 4.52f;
	final float cssMinSize = 1.62f;
	final float audioSize = 4.26f;
	final float audioUniSize = 4.66f;
	final float searchSize = 2.87f;
	final float searchUniSize = 3.77f;
	final float searchMinSize = 1.41f;

	// 构造函数
	core() {
		JFrame frame = new JFrame("Parser 插件包选择");
		frame.setSize(480, 520);
		frame.setLocationRelativeTo(null);
		frame.setLayout(null);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		// 使用平台
		JLabel typeLabel = new JLabel("使用平台：");
		typeLabel.setBounds(20, 20, 80, 20);
		typeWx = new JRadioButton("微信（" + wxSize + "KB）");
		typeWx.setBounds(100, 20, 150, 20);
		typeWx.setSelected(true);
		frame.add(typeWx);
		typeQq = new JRadioButton("QQ（" + qqSize + "KB）");
		typeQq.setBounds(100, 45, 150, 20);
		frame.add(typeQq);
		typeBd = new JRadioButton("百度（" + bdSize + "KB）");
		typeBd.setBounds(100, 70, 150, 20);
		frame.add(typeBd);
		typeMy = new JRadioButton("支付宝（" + mySize + "KB）");
		typeMy.setBounds(100, 95, 150, 20);
		frame.add(typeMy);
		typeTt = new JRadioButton("头条（" + ttSize + "KB）");
		typeTt.setBounds(100, 120, 150, 20);
		frame.add(typeTt);
		typeUniApp = new JRadioButton("uni-app（" + uniAppSize + "KB）");
		typeUniApp.setBounds(100, 145, 150, 20);
		frame.add(typeUniApp);
		ButtonGroup typeGroup = new ButtonGroup();
		typeGroup.add(typeWx);
		typeGroup.add(typeQq);
		typeGroup.add(typeBd);
		typeGroup.add(typeMy);
		typeGroup.add(typeTt);
		typeGroup.add(typeUniApp);
		frame.add(typeLabel);
		// 扩展包
		JLabel patchLabel = new JLabel("扩\u2002展\u2002包：");
		patchLabel.setBounds(20, 175, 80, 20);
		frame.add(patchLabel);
		emoji = new JCheckBox("emoji（解析 emoji 小表情，" + emojiSize + "KB）");
		emoji.setBounds(100, 175, 250, 20);
		frame.add(emoji);
		document = new JCheckBox("document（动态操作 dom，" + domSize + "KB）");
		document.setBounds(100, 200, 250, 20);
		frame.add(document);
		CssHandler = new JCheckBox("CssHandler（支持更多 css 选择器，" + cssSize + "KB）");
		CssHandler.setBounds(100, 225, 300, 20);
		frame.add(CssHandler);
		audio = new JCheckBox("audio（音乐播放器，" + audioSize + "KB）");
		audio.setBounds(100, 250, 300, 20);
		frame.add(audio);
		search = new JCheckBox("search（关键词搜索，" + searchSize + "KB）");
		search.setBounds(100, 275, 250, 20);
		frame.add(search);
		// 版本
		JLabel versionLabel = new JLabel("版\u2003\u2003本：");
		versionLabel.setBounds(20, 305, 80, 20);
		frame.add(versionLabel);
		JRadioButton normal = new JRadioButton("正常");
		normal.setBounds(100, 305, 80, 20);
		normal.setSelected(true);
		frame.add(normal);
		JRadioButton min = new JRadioButton("min");
		min.setBounds(180, 305, 80, 20);
		ButtonGroup versionGroup = new ButtonGroup();
		versionGroup.add(normal);
		versionGroup.add(min);
		frame.add(normal);
		frame.add(min);
		// 总大小
		JLabel sizeLabel = new JLabel("总\u2002大\u2002小：");
		sizeLabel.setBounds(20, 335, 80, 20);
		frame.add(sizeLabel);
		JLabel size = new JLabel(wxSize + " KB");
		size.setBounds(100, 335, 80, 20);
		frame.add(size);
		// 生成目录
		final File desktop = FileSystemView.getFileSystemView().getHomeDirectory();
		JLabel dirLabel = new JLabel("生成目录：");
		dirLabel.setBounds(20, 365, 80, 20);
		JTextField dir = new JTextField(desktop.getAbsolutePath() + File.separator + "parser");
		dir.setBounds(100, 365, 230, 20);
		frame.add(dir);
		frame.add(dirLabel);
		JButton dirBut = new JButton("...");
		dirBut.setBounds(340, 365, 30, 20);
		frame.add(dirBut);
		dirBut.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				JFileChooser jfc = new JFileChooser();
				jfc.setDialogTitle("选择生成目录");
				jfc.setCurrentDirectory(desktop);
				jfc.setFileSelectionMode(JFileChooser.DIRECTORIES_ONLY);
				int result = jfc.showOpenDialog(frame);
				if (result == JFileChooser.APPROVE_OPTION) {
					File file = jfc.getSelectedFile();
					if (typeWx.isSelected())
						dir.setText(file.getAbsolutePath() + File.separator + "parser");
					else
						dir.setText(file.getAbsolutePath() + File.separator + "jyf-parser");
				}
			}

		});
		// 生成按钮
		JButton createBut = new JButton("生成");
		createBut.setBounds(200, 410, 80, 30);
		frame.add(createBut);
		// 生成平台选择
		typeWx.addItemListener(new ItemListener() {
			@Override
			public void itemStateChanged(ItemEvent item) {
				if (item.getStateChange() == ItemEvent.SELECTED)
					size.setText(calcSize());
			}
		});
		typeQq.addItemListener(new ItemListener() {
			@Override
			public void itemStateChanged(ItemEvent item) {
				if (item.getStateChange() == ItemEvent.SELECTED)
					size.setText(calcSize());
			}
		});
		typeBd.addItemListener(new ItemListener() {
			@Override
			public void itemStateChanged(ItemEvent item) {
				if (item.getStateChange() == ItemEvent.SELECTED) {
					size.setText(calcSize());
					audio.setSelected(false);
					audio.setEnabled(false);
				} else
					audio.setEnabled(true);
			}
		});
		typeMy.addItemListener(new ItemListener() {
			@Override
			public void itemStateChanged(ItemEvent item) {
				if (item.getStateChange() == ItemEvent.SELECTED) {
					size.setText(calcSize());
					audio.setSelected(false);
					audio.setEnabled(false);
				} else
					audio.setEnabled(true);
			}
		});
		typeTt.addItemListener(new ItemListener() {
			@Override
			public void itemStateChanged(ItemEvent item) {
				if (item.getStateChange() == ItemEvent.SELECTED)
					size.setText(calcSize());
			}
		});
		typeUniApp.addItemListener(new ItemListener() {

			@Override
			public void itemStateChanged(ItemEvent item) {
				if (item.getStateChange() != ItemEvent.SELECTED) {
					audio.setText("audio（音乐播放器，" + audioSize + "KB）");
					document.setText("document（动态操作 dom，" + (isMin ? domMinSize : domSize) + "KB）");
					search.setText("search（关键词搜索，" + (isMin ? searchMinSize : searchSize) + "KB）");
				} else {
					audio.setText("audio（音乐播放器，" + audioUniSize + "KB）");
					document.setText("document（动态操作 dom，" + domUniSize + "KB）");
					search.setText("search（关键词搜索，" + searchUniSize + "KB）");
					size.setText(calcSize()); // 重新计算大小
				}
				String[] path = dir.getText().split(Matcher.quoteReplacement(File.separator));
				if (path.length > 1) {
					if (item.getStateChange() == ItemEvent.SELECTED) {
						if (path[path.length - 1].equals("parser")) {
							path[path.length - 1] = "jyf-parser";
							dir.setText(String.join(File.separator, path));
						}
					} else if (path[path.length - 1].equals("jyf-parser")) {
						path[path.length - 1] = "parser";
						dir.setText(String.join(File.separator, path));
					}
				}
			}
		});
		// 扩展包选择
		ActionListener listener = new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				size.setText(calcSize());
			}

		};
		emoji.addActionListener(listener);
		document.addActionListener(listener);
		CssHandler.addActionListener(listener);
		audio.addActionListener(listener);
		search.addActionListener(listener);
		// min 版本选择
		min.addItemListener(new ItemListener() {

			@Override
			public void itemStateChanged(ItemEvent item) {
				// 重新设置大小
				if (item.getStateChange() == ItemEvent.SELECTED) {
					isMin = true;
					typeWx.setText("微信（" + wxMinSize + "KB）");
					emoji.setText("emoji（解析 emoji 小表情，" + emojiMinSize + "KB）");
					if (!typeUniApp.isSelected()) {
						document.setText("document（动态操作 dom，" + domMinSize + "KB）");
						search.setText("search（关键词搜索，" + searchMinSize + "KB）");
					}
					CssHandler.setText("CssHandler（支持更多 css 选择器，" + cssMinSize + "KB）");
				} else {
					isMin = false;
					typeWx.setText("微信（" + wxSize + "KB）");
					emoji.setText("emoji（解析 emoji 小表情，" + emojiSize + "KB）");
					if (!typeUniApp.isSelected()) {
						document.setText("document（动态操作 dom，" + domSize + "KB）");
						search.setText("search（关键词搜索，" + searchSize + "KB）");
					}
					CssHandler.setText("CssHandler（支持更多 css 选择器，" + cssSize + "KB）");
				}
				size.setText(calcSize());
			}

		});
		// 生成对应插件包
		createBut.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				try {
					String newPath = dir.getText(), endl = String.format("%n");
					File file = new File(newPath);
					if (!file.exists())
						file.mkdir(); // 创建目标目录
					if (!file.isDirectory()) {
						JOptionPane.showMessageDialog(null, "该目录不是一个文件夹", "失败", JOptionPane.ERROR_MESSAGE);
						return;
					}
					if (file.listFiles().length > 0) {
						if (JOptionPane.showConfirmDialog(null, "选择的文件夹非空，是否继续？", "确认", JOptionPane.YES_NO_OPTION) == 1)
							return;
					}
					// 生成 uni-app 包
					if (typeUniApp.isSelected()) {
						copyDir("./parser.uni", newPath);
						if (audio.isSelected()) {
							copyFile("./patches/audio/audio.vue", newPath + "/libs/audio.vue");
							modifyFile(newPath + "/libs/trees.vue", "<audio", "<myAudio");
							modifyFile(newPath + "/libs/trees.vue", "export default {\r\n		components: {",
									"import myAudio from './audio'\r\n	export default {\r\n		components: {\r\n			myAudio,");
						}
						if (document.isSelected()) {
							copyFile("./patches/document/document.uni.js", newPath + "/libs/document.js");
							modifyFile(newPath + "/jyf-parser.vue", "var dom",
									"var dom = require(\"./libs/document.js\")");
						}
						if (search.isSelected()) {
							copyFile("./patches/search/search.uni.js", newPath + "/libs/search.js");
							modifyFile(newPath + "/jyf-parser.vue", "var search",
									"var search = require(\"./libs/search.js\")");
						}
					} else {
						// 生成微信包
						if (typeWx.isSelected()) {
							if (isMin)
								copyDir("./parser.min", newPath);
							else
								copyDir("./parser", newPath);
							if (audio.isSelected()) {
								copyDir("./patches/audio/audio", newPath + "/audio");
								modifyFile(newPath + "/trees/trees.json", "\"./trees\"",
										"\"./trees\"," + endl + "    \"myAudio\": \"../audio/audio\"");
								modifyFile(newPath + "/trees/trees.wxml", "<audio", "<myAudio");
							}
						}
						// 生成 QQ 包
						else if (typeQq.isSelected()) {
							copyDir("./parser.qq", newPath);
							if (audio.isSelected()) {
								copyDir("./patches/audio/audio", newPath + "/audio");
								renameFile(newPath + "/audio/audio.wxml", newPath + "/audio/audio.qml");
								renameFile(newPath + "/audio/audio.wxss", newPath + "/audio/audio.qss");
								modifyFile(newPath + "/audio/audio.js", "wx", "qq");
								modifyFile(newPath + "/trees/trees.json", "\"./trees\"",
										"\"./trees\"," + endl + "    \"myAudio\": \"../audio/audio\"");
								modifyFile(newPath + "/trees/trees.qml", "<audio", "<myAudio");
							}
						}
						// 生成百度包
						else if (typeBd.isSelected())
							copyDir("./parser.bd", newPath);
						// 生成支付宝包
						else if (typeMy.isSelected())
							copyDir("./parser.my", newPath);
						// 生成头条包
						else if (typeTt.isSelected()) {
							copyDir("./parser.tt", newPath);
							if (audio.isSelected()) {
								copyDir("./patches/audio/audio", newPath + "/audio");
								renameFile(newPath + "/audio/audio.wxml", newPath + "/audio/audio.ttml");
								renameFile(newPath + "/audio/audio.wxss", newPath + "/audio/audio.ttss");
								modifyFile(newPath + "/audio/audio.js", "wx", "tt");
								modifyFile(newPath + "/trees/trees.json", "\"./trees\"",
										"\"./trees\"," + endl + "    \"myAudio\": \"../audio/audio\"");
								modifyFile(newPath + "/trees/trees.ttml", "<!--音频-->",
										"<myAudio tt:elif=\"{{n.name=='audio'}}\" id=\"{{n.attrs.id}}\" class=\"{{n.attrs.class}}\" style=\"{{n.attrs.style}}\" author=\"{{n.attrs.author}}\" autoplay=\"{{n.attrs.autoplay}}\" controls=\"{{n.attrs.controls}}\" loop=\"{{n.attrs.loop}}\" name=\"{{n.attrs.name}}\" poster=\"{{n.attrs.poster}}\" src=\"{{n.attrs.source[n.i||0]}}\" data-i=\"{{index}}\" data-source=\"audio\" binderror=\"error\" bindplay=\"play\" />");
							}
						}
						if (document.isSelected()) {
							modifyFile(newPath + "/parser.js", "var dom", "var dom = require(\"./libs/document.js\")");
							copyFile("./patches/document/document" + (isMin ? ".min" : "") + ".js",
									newPath + "/libs/document.js");
						}
						if (search.isSelected()) {
							modifyFile(newPath + "/parser.js", "var search",
									"var search = require(\"./libs/search.js\")");
							copyFile("./patches/search/search" + (isMin ? ".min" : "") + ".js",
									newPath + "/libs/search.js");
						}
					}
					// 处理公共扩展包
					if (emoji.isSelected()) {
						modifyFile(newPath + "/libs/MpHtmlParser.js", "var emoji",
								"var emoji = require(\"./emoji.js\")");
						copyFile("./patches/emoji/emoji" + (isMin ? ".min" : "") + ".js", newPath + "/libs/emoji.js");
					}
					if (CssHandler.isSelected())
						copyFile("./patches/CssHandler/CssHandler" + (isMin ? ".min" : "") + ".js",
								newPath + "/libs/CssHandler.js");
					String cmdDir[] = { "explorer.exe", newPath };
					Runtime.getRuntime().exec(cmdDir);
					JOptionPane.showMessageDialog(null, "生成成功", "成功", JOptionPane.PLAIN_MESSAGE);
				} catch (IOException e1) {
					JOptionPane.showMessageDialog(null, e1.getMessage(), "失败", JOptionPane.ERROR_MESSAGE);
				}
			}

		});
		frame.setVisible(true);
	}

	// 计算大小
	private String calcSize() {
		float size;
		if (typeWx.isSelected())
			size = isMin ? wxMinSize : wxSize;
		else if (typeQq.isSelected())
			size = qqSize;
		else if (typeBd.isSelected())
			size = bdSize;
		else if (typeMy.isSelected())
			size = mySize;
		else if (typeTt.isSelected())
			size = ttSize;
		else
			size = uniAppSize;
		if (emoji.isSelected())
			size += isMin ? emojiMinSize : emojiSize;
		if (document.isSelected())
			size += typeUniApp.isSelected() ? domUniSize : (isMin ? domMinSize : domSize);
		if (CssHandler.isSelected())
			size += isMin ? cssMinSize : cssSize;
		if (audio.isSelected())
			size += typeUniApp.isSelected() ? audioUniSize : audioSize;
		if (search.isSelected())
			size += typeUniApp.isSelected() ? searchUniSize : (isMin ? searchMinSize : searchSize);
		return new DecimalFormat(".00").format(size) + " KB";
	}

	// 修改文件
	private void modifyFile(String path, String oldVal, String newVal) throws IOException {
		File file = new File(path);
		byte[] bytes = new byte[(int) file.length()];
		FileInputStream reader = new FileInputStream(file);
		reader.read(bytes);
		reader.close();
		String content = new String(bytes, "utf-8");
		content = content.replaceFirst(oldVal, newVal);
		FileOutputStream writer = new FileOutputStream(file, false);
		writer.write(content.getBytes("utf-8"));
		writer.close();
	}

	// 拷贝文件
	private void copyFile(String oldPath, String newPath) throws IOException {
		FileOutputStream out = new FileOutputStream(newPath);
		Files.copy(Paths.get(oldPath), out);
		out.close();
	}

	// 拷贝文件夹
	private void copyDir(String oldPath, String newPath) throws IOException {
		File file = new File(oldPath);
		if (!file.exists())
			throw new IOException("文件夹不存在：" + oldPath);
		String[] filePath = file.list();

		if (!(new File(newPath)).exists())
			(new File(newPath)).mkdir();

		for (int i = 0; i < filePath.length; i++) {
			if ((new File(oldPath + File.separator + filePath[i])).isDirectory())
				copyDir(oldPath + File.separator + filePath[i], newPath + File.separator + filePath[i]);

			if (new File(oldPath + File.separator + filePath[i]).isFile())
				copyFile(oldPath + File.separator + filePath[i], newPath + File.separator + filePath[i]);

		}
	}

	// 重命名文件
	private void renameFile(String oldPath, String newPath) {
		File oldFile = new File(oldPath);
		File newFile = new File(newPath);
		if (oldFile.exists() && oldFile.isFile())
			oldFile.renameTo(newFile);
	}
}


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
	JRadioButton typeTt;
	JRadioButton typeUniApp;
	// 补丁包
	JCheckBox emoji;
	JCheckBox document;
	JCheckBox CssHandler;
	JCheckBox audio;
	// 是否 min 版本
	boolean isMin = false;

	// 包大小
	final float wxSize = 41.9f;
	final float wxMinSize = 28.2f;
	final float qqSize = 41.5f;
	final float bdSize = 40.3f;
	final float ttSize = 40.8f;
	final float uniAppSize = 59.3f;
	final float emojiSize = 4.21f;
	final float emojiMinSize = 3.15f;
	final float domSize = 7.13f;
	final float domUniSize = 5.81f;
	final float domMinSize = 5.44f;
	final float cssSize = 4.78f;
	final float cssMinSize = 1.49f;
	final float audioSize = 4.11f;
	final float audioUniSize = 4.62f;

	// 构造函数
	core() {
		JFrame frame = new JFrame("Parser 插件包选择");
		frame.setSize(480, 470);
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
		typeTt = new JRadioButton("头条（" + ttSize + "KB）");
		typeTt.setBounds(100, 95, 150, 20);
		frame.add(typeTt);
		typeUniApp = new JRadioButton("uni-app（" + uniAppSize + "KB）");
		typeUniApp.setBounds(100, 120, 150, 20);
		frame.add(typeUniApp);
		ButtonGroup typeGroup = new ButtonGroup();
		typeGroup.add(typeWx);
		typeGroup.add(typeQq);
		typeGroup.add(typeBd);
		typeGroup.add(typeTt);
		typeGroup.add(typeUniApp);
		frame.add(typeLabel);
		// 补丁包
		JLabel patchLabel = new JLabel("补\u2002丁\u2002包：");
		patchLabel.setBounds(20, 150, 80, 20);
		frame.add(patchLabel);
		emoji = new JCheckBox("emoji（解析 emoji 小表情，" + emojiSize + "KB）");
		emoji.setBounds(100, 150, 250, 20);
		frame.add(emoji);
		document = new JCheckBox("document（动态操作 dom，" + domSize + "KB）");
		document.setBounds(100, 175, 250, 20);
		frame.add(document);
		CssHandler = new JCheckBox("CssHandler（支持更多 css 选择器，" + cssSize + "KB）");
		CssHandler.setBounds(100, 200, 300, 20);
		frame.add(CssHandler);
		audio = new JCheckBox("audio（音乐播放器，" + audioSize + "KB）");
		audio.setBounds(100, 225, 300, 20);
		frame.add(audio);
		// 版本
		JLabel versionLabel = new JLabel("版\u2003\u2003本：");
		versionLabel.setBounds(20, 255, 80, 20);
		frame.add(versionLabel);
		JRadioButton normal = new JRadioButton("正常");
		normal.setBounds(100, 255, 80, 20);
		normal.setSelected(true);
		frame.add(normal);
		JRadioButton min = new JRadioButton("min");
		min.setBounds(180, 255, 80, 20);
		ButtonGroup versionGroup = new ButtonGroup();
		versionGroup.add(normal);
		versionGroup.add(min);
		frame.add(normal);
		frame.add(min);
		// 总大小
		JLabel sizeLabel = new JLabel("总\u2002大\u2002小：");
		sizeLabel.setBounds(20, 285, 80, 20);
		frame.add(sizeLabel);
		JLabel size = new JLabel(wxSize + " KB");
		size.setBounds(100, 285, 80, 20);
		frame.add(size);
		// 生成目录
		final File desktop = FileSystemView.getFileSystemView().getHomeDirectory();
		JLabel dirLabel = new JLabel("生成目录：");
		dirLabel.setBounds(20, 315, 80, 20);
		JTextField dir = new JTextField(desktop.getAbsolutePath() + File.separator + "parser");
		dir.setBounds(100, 315, 230, 20);
		frame.add(dir);
		frame.add(dirLabel);
		JButton dirBut = new JButton("...");
		dirBut.setBounds(340, 315, 30, 20);
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
		createBut.setBounds(200, 360, 80, 30);
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
				} else {
					audio.setText("audio（音乐播放器，" + audioUniSize + "KB）");
					document.setText("document（动态操作 dom，" + domUniSize + "KB）");
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
		// 补丁包选择
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
		// min 版本选择
		min.addItemListener(new ItemListener() {

			@Override
			public void itemStateChanged(ItemEvent item) {
				// 重新设置大小
				if (item.getStateChange() == ItemEvent.SELECTED) {
					isMin = true;
					typeWx.setText("微信（" + wxMinSize + "KB）");
					emoji.setText("emoji（解析 emoji 小表情，" + emojiMinSize + "KB）");
					if (!typeUniApp.isSelected())
						document.setText("document（动态操作 dom，" + domMinSize + "KB）");
					CssHandler.setText("CssHandler（支持更多 css 选择器，" + cssMinSize + "KB）");
				} else {
					isMin = false;
					typeWx.setText("微信（" + wxSize + "KB）");
					emoji.setText("emoji（解析 emoji 小表情，" + emojiSize + "KB）");
					if (!typeUniApp.isSelected())
						document.setText("document（动态操作 dom，" + domSize + "KB）");
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
					// 生成 uni-app 包
					if (typeUniApp.isSelected()) {
						copyDir("./parser.uni", newPath);
						if (audio.isSelected()) {
							Files.copy(Paths.get("./patches/audio/audio.vue"),
									new FileOutputStream(newPath + "/libs/audio.vue"));
							modifyFile(newPath + "/libs/trees.vue", "<audio", "<myAudio");
							modifyFile(newPath + "/libs/trees.vue", "export default {\r\n		components: {",
									"import myAudio from './audio'\r\n	export default {\r\n		components: {\r\n			myAudio,");
						}
						if (document.isSelected()) {
							modifyFile(newPath + "/jyf-parser.vue", "var dom",
									"var dom = require(\"./libs/document.js\")");
							Files.copy(Paths.get("./patches/document/document.uni.js"),
									new FileOutputStream(newPath + "/libs/document.js"));
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
								modifyFile(newPath + "/trees/trees.json", "\"./trees\"",
										"\"./trees\"," + endl + "    \"myAudio\": \"../audio/audio\"");
								modifyFile(newPath + "/trees/trees.qml", "<audio", "<myAudio");
							}
						}
						// 生成百度包
						else if (typeBd.isSelected())
							copyDir("./parser.bd", newPath);
						// 生成头条包
						else if (typeTt.isSelected()) {
							copyDir("./parser.tt", newPath);
							if (audio.isSelected()) {
								copyDir("./patches/audio/audio", newPath + "/audio");
								modifyFile(newPath + "/trees/trees.json", "\"./trees\"",
										"\"./trees\"," + endl + "    \"myAudio\": \"../audio/audio\"");
								modifyFile(newPath + "/trees/trees.ttml", "<!--音频-->",
										"<myAudio tt:elif=\"{{n.name=='audio'}}\" id=\"{{n.attrs.id}}\" class=\"{{n.attrs.class}}\" style=\"{{n.attrs.style}}\" author=\"{{n.attrs.author}}\" autoplay=\"{{n.attrs.autoplay}}\" controls=\"{{n.attrs.controls}}\" loop=\"{{n.attrs.loop}}\" name=\"{{n.attrs.name}}\" poster=\"{{n.attrs.poster}}\" src=\"{{n.attrs.source[n.i||0]}}\" data-i=\"{{index}}\" data-source=\"audio\" binderror=\"error\" bindplay=\"play\" />");
							}
						}
						if (document.isSelected()) {
							modifyFile(newPath + "/parser.js", "var dom", "var dom = require(\"./libs/document.js\")");
							Files.copy(Paths.get("./patches/document/document" + (isMin ? ".min" : "") + ".js"),
									new FileOutputStream(newPath + "/libs/document.js"));
						}
					}
					// 处理公共补丁包
					if (emoji.isSelected()) {
						modifyFile(newPath + "/libs/MpHtmlParser.js", "var emoji",
								"var emoji = require(\"./emoji.js\")");
						Files.copy(Paths.get("./patches/emoji/emoji" + (isMin ? ".min" : "") + ".js"),
								new FileOutputStream(newPath + "/libs/emoji.js"));
					}
					if (CssHandler.isSelected())
						Files.copy(Paths.get("./patches/CssHandler/CssHandler" + (isMin ? ".min" : "") + ".js"),
								new FileOutputStream(newPath + "/libs/CssHandler.js"));
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

	// 计算大小
	private String calcSize() {
		float size;
		if (typeWx.isSelected())
			size = isMin ? wxMinSize : wxSize;
		else if (typeQq.isSelected())
			size = qqSize;
		else if (typeBd.isSelected())
			size = bdSize;
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
		return new DecimalFormat(".00").format(size) + " KB";
	}

	// 拷贝文件夹
	private void copyDir(String oldPath, String newPath) throws IOException {
		File file = new File(oldPath);
		String[] filePath = file.list();

		if (!(new File(newPath)).exists())
			(new File(newPath)).mkdir();

		for (int i = 0; i < filePath.length; i++) {
			if ((new File(oldPath + File.separator + filePath[i])).isDirectory())
				copyDir(oldPath + File.separator + filePath[i], newPath + File.separator + filePath[i]);

			if (new File(oldPath + File.separator + filePath[i]).isFile())
				Files.copy(Paths.get(oldPath + File.separator + filePath[i]),
						new FileOutputStream(newPath + File.separator + filePath[i]));

		}
	}
}

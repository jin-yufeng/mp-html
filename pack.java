
/*
 * Parser 插件包打包工具（按需生成插件包）
 * github地址：https://github.com/jin-yufeng/Parser
 * 文档地址：https://jin-yufeng.github.io/Parser
 * author：JinYufeng
*/
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.ItemEvent;
import java.awt.event.ItemListener;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
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
	JRadioButton typeUniApp;
	// 补丁包
	JCheckBox emoji;
	JCheckBox document;
	JCheckBox CssHandler;
	// 是否 min 版本
	boolean isMin = false;

	// 包大小
	final float wxSize = 46.7f;
	final float wxMinSize = 30.9f;
	final float uniAppSize = 59.1f;
	final float emojiSize = 4.29f;
	final float emojiMinSize = 3.16f;
	final float domSize = 4.57f;
	final float domMinSize = 3.72f;
	final float cssSize = 4.42f;
	final float cssMinSize = 1.27f;

	// 构造函数
	core() {
		JFrame frame = new JFrame("Parser 插件包选择");
		frame.setSize(480, 350);
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
		typeUniApp = new JRadioButton("uni-app（" + uniAppSize + "KB）");
		typeUniApp.setBounds(250, 20, 150, 20);
		ButtonGroup typeGroup = new ButtonGroup();
		typeGroup.add(typeWx);
		typeGroup.add(typeUniApp);
		frame.add(typeUniApp);
		frame.add(typeLabel);
		// 补丁包
		JLabel patchLabel = new JLabel("补\u2002丁\u2002包：");
		patchLabel.setBounds(20, 50, 80, 20);
		frame.add(patchLabel);
		emoji = new JCheckBox("emoji（解析 emoji 小表情，" + emojiSize + "KB）");
		emoji.setBounds(100, 50, 250, 20);
		frame.add(emoji);
		document = new JCheckBox("document（动态操作 dom，" + domSize + "KB）");
		document.setBounds(100, 75, 250, 20);
		frame.add(document);
		CssHandler = new JCheckBox("CssHandler（支持更多 css 选择器，" + cssSize + "KB）");
		CssHandler.setBounds(100, 100, 300, 20);
		frame.add(CssHandler);
		// 版本
		JLabel versionLabel = new JLabel("版\u2003\u2003本：");
		versionLabel.setBounds(20, 130, 80, 20);
		frame.add(versionLabel);
		JRadioButton normal = new JRadioButton("正常");
		normal.setBounds(100, 130, 80, 20);
		normal.setSelected(true);
		frame.add(normal);
		JRadioButton min = new JRadioButton("min");
		min.setBounds(180, 130, 80, 20);
		ButtonGroup versionGroup = new ButtonGroup();
		versionGroup.add(normal);
		versionGroup.add(min);
		frame.add(normal);
		frame.add(min);
		// 总大小
		JLabel sizeLabel = new JLabel("总\u2002大\u2002小：");
		sizeLabel.setBounds(20, 160, 80, 20);
		frame.add(sizeLabel);
		JLabel size = new JLabel(wxSize + " KB");
		size.setBounds(100, 160, 80, 20);
		frame.add(size);
		// 生成目录
		final File desktop = FileSystemView.getFileSystemView().getHomeDirectory();
		JLabel dirLabel = new JLabel("生成目录：");
		dirLabel.setBounds(20, 190, 80, 20);
		JTextField dir = new JTextField(desktop.getAbsolutePath() + File.separator + "parser");
		dir.setBounds(100, 190, 230, 20);
		frame.add(dir);
		frame.add(dirLabel);
		JButton dirBut = new JButton("...");
		dirBut.setBounds(340, 190, 30, 20);
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
		createBut.setBounds(200, 235, 80, 30);
		frame.add(createBut);
		// 生成平台选择
		typeWx.addItemListener(new ItemListener() {

			@Override
			public void itemStateChanged(ItemEvent item) {
				size.setText(calcSize()); // 重新计算大小
				String[] path = dir.getText().split(Matcher.quoteReplacement(File.separator));
				if (path.length > 1) {
					if (item.getStateChange() == ItemEvent.SELECTED) {
						if (path[path.length - 1].equals("jyf-parser")) {
							path[path.length - 1] = "parser";
							dir.setText(String.join(File.separator, path));
						}
					} else if (path[path.length - 1].equals("parser")) {
						path[path.length - 1] = "jyf-parser";
						dir.setText(String.join(File.separator, path));
					}

				}

			}

		});
		// 补丁包选择
		emoji.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				size.setText(calcSize());
			}

		});
		document.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				size.setText(calcSize());
			}

		});
		CssHandler.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				size.setText(calcSize());
			}

		});
		// min 版本选择
		min.addItemListener(new ItemListener() {

			@Override
			public void itemStateChanged(ItemEvent item) {
				// 重新设置大小
				if (item.getStateChange() == ItemEvent.SELECTED) {
					isMin = true;
					typeWx.setText("微信（" + wxMinSize + "KB）");
					emoji.setText("emoji（解析 emoji 小表情，" + emojiMinSize + "KB）");
					document.setText("document（动态操作 dom，" + domMinSize + "KB）");
					CssHandler.setText("CssHandler（支持更多 css 选择器，" + cssMinSize + "KB）");
				} else {
					isMin = false;
					typeWx.setText("微信（" + wxSize + "KB）");
					emoji.setText("emoji（解析 emoji 小表情，" + emojiSize + "KB）");
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
					String newPath = dir.getText();
					File file = new File(newPath);
					if (!file.exists())
						file.mkdir(); // 创建目标目录
					// 拷贝主包
					if (typeWx.isSelected()) {
						if (min.isSelected())
							copyDir("./parser.min", newPath);
						else
							copyDir("./parser", newPath);
					} else {
						copyDir("./parser.uni", newPath);
						String line, endl = String.format("%n");
						// uni-app 包装载 emoji 和 document 补丁包时需要修改部分内容
						if (emoji.isSelected()) {
							StringBuffer content = new StringBuffer();
							BufferedReader reader = new BufferedReader(new InputStreamReader(
									new FileInputStream(newPath + "/libs/MpHtmlParser.js"), "utf-8"));
							boolean changed = false;
							while ((line = reader.readLine()) != null) {
								if (!changed && line.indexOf("var emoji") != -1) {
									content.append("const emoji = require(\"./emoji.js\");" + endl);
									changed = true;
								} else
									content.append(line + endl);
							}
							reader.close();
							FileOutputStream writer = new FileOutputStream(new File(newPath + "/libs/MpHtmlParser.js"),
									false);
							writer.write(content.toString().getBytes("utf-8"));
							writer.close();
						}
						if (document.isSelected()) {
							StringBuffer content = new StringBuffer();
							BufferedReader reader = new BufferedReader(
									new InputStreamReader(new FileInputStream(newPath + "/jyf-parser.vue"), "utf-8"));
							boolean changed = false;
							while ((line = reader.readLine()) != null) {
								if (!changed && line.indexOf("var document") != -1) {
									content.append("\tconst document = require(\"./libs/document.js\");" + endl);
									changed = true;
								} else
									content.append(line + endl);
							}
							reader.close();
							FileOutputStream writer = new FileOutputStream(new File(newPath + "/jyf-parser.vue"),
									false);
							writer.write(content.toString().getBytes("utf-8"));
							writer.close();
						}
					}
					if (emoji.isSelected())
						Files.copy(Paths.get("./patches/emoji/emoji" + (isMin ? ".min" : "") + ".js"),
								new FileOutputStream(newPath + "/libs/emoji.js"));
					if (document.isSelected())
						Files.copy(Paths.get("./patches/document/document" + (isMin ? ".min" : "") + ".js"),
								new FileOutputStream(newPath + "/libs/document.js"));
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

	private String calcSize() {
		float size;
		if (typeWx.isSelected())
			size = isMin ? wxMinSize : wxSize;
		else
			size = uniAppSize;
		if (emoji.isSelected())
			size += isMin ? emojiMinSize : emojiSize;
		if (document.isSelected())
			size += isMin ? domMinSize : domSize;
		if (CssHandler.isSelected())
			size += isMin ? cssMinSize : cssSize;
		return new DecimalFormat(".00").format(size) + " KB";
	}

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
